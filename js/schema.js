const Ajv = require('ajv')
const addFormats = require('ajv-formats')
const { keywords, kTypes, Main, Incident, Perpetrator } = require('./schemaCfg.js')

module.exports = class Schema {
  constructor() {
    this.validate = { encode: {}, decode: {} };
    this.schemaCfg = { Main, Incident, Perpetrator }

    this.ajv = new Ajv({ allErrors: true, removeAdditional: "all" }); // options can be passed, e.g. {allErrors: true}
    addFormats(this.ajv);

    // add user defined keywords
    Object.keys(keywords).forEach(d => {
      this.ajv.addKeyword({
        keyword: '$' + d,
        type: kTypes[d],
        modifying: true,
        error: { message: (d) => d['keyword'] + ": Invalid value, property deleted" }, // always be true, silently delete
        errors: true,
        compile: keywords[d]
      });
    });

  }

  coder(encode, cfg, lang, parentObj) {
    let schema = { type: "object", properties: {}, required: [] };
    if (!parentObj) parentObj = schema;

    cfg.forEach(d => {

      if (d.type == "string" || d.type == "code") {
        let o = { type: "string" };
        parentObj.properties[d.Name] = o;
        if (d.minLen) o.minLength = d.minLen;
        if (d.maxLen) o.maxLength = d.maxLen;
      }

      if (d.type == "number") {
        let o = { type: d.type };
        parentObj.properties[d.Name] = o;
      }

      if (d.type == "integer") {
        let o = { type: d.type };
        parentObj.properties[d.Name] = o;
      }

      if (d.type == "array" || d.type == "code-array") {
        let o = { type: "array" };
        parentObj.properties[d.Name] = o;
        if (d.minLen) o.minItems = d.minLen;
        if (d.maxLen) o.maxItems = d.maxLen;
        if (d.type == "array") {
          o.items = { type: "object", properties: {}, required: [] };
          this.coder(encode, this.schemaCfg[d["Values-" + lang]], lang, o.items);
        }
      }

      if (d.type == "boolean") {
        let o = { type: "string" };
        parentObj.properties[d.Name] = o;
      }

      if (d.type == "object") {
        let o = { type: d.type, properties: {}, required: [] };
        parentObj.properties[d.Name] = o;
      }

      if (d.type == "date") { // imported format
        let o = { type: "string", format: d.type };
        parentObj.properties[d.Name] = o;
      }

      // required
      if (d.Required) {
        parentObj.required.push(d.Name);
      }

      // keyword additions
      if (encode) {
        if (d.type == "code" || d.type == "boolean") {
          // parentObj.properties[d.Name].type = "string"
          parentObj.properties[d.Name]['$encode'] = d["Values-" + lang].split(',').map(d => d.trim());
        }
        if (d.type == "code-array") {
          parentObj.properties[d.Name]['$encode-array'] = d["Values-" + lang].split(',').map(d => d.trim());
        }
      } else {
        if (d.type == "code" || d.type == "boolean") {
          parentObj.properties[d.Name].type = "integer"
          parentObj.properties[d.Name]['$decode'] = d["Values-" + lang].split(',').map(d => d.trim());
        }
        if (d.type == "code-array") {
          parentObj.properties[d.Name]['$decode-array'] = d["Values-" + lang].split(',').map(d => d.trim());
        }
      }

    })

    return schema;
  }

  initValidator(type, lang) {
    if (!this.validate[type][lang]) {
      let schema = this.coder(type == "encode", this.schemaCfg.Main, lang);
      this.validate[type][lang] = this.ajv.compile(schema);
    }

    return this.validate[type][lang];
  }

  encode(d, lang) {

    let validate = this.initValidator("encode", lang);

    // let schema = coder(true, this.schemaCfg.Main, lang);
    // let validate = ajv.compile(schema)

    let valid = validate(d);

    return { valid, errors: validate.errors };
  }

  decode(d, lang) {

    let validate = this.initValidator("decode", lang);
    let valid = validate(d);

    return { valid, errors: validate.errors };
  }
}