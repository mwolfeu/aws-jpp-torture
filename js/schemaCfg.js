// AJV schema - user defined keywords
module.exports.keywords = {

  encode: function(sch, parentSchema) {
    return function(data, obj) {
      let key = obj.parentDataProperty;
      obj.parentData[key] = sch.indexOf(obj.parentData[key]);
      if (obj.parentData[key] == undefined) {
        delete(obj.parentData[key])
        return false
      }

      return true;
    }
  },

  "encode-array": function(sch, parentSchema) {
    return function(data, obj, a) {
      let key = obj.parentDataProperty;
      obj.parentData[key] =
        obj.parentData[key].map(d => sch.indexOf(d));

      if (obj.parentData[obj.parentDataProperty].includes(-1)) {
        delete(obj.parentData[key])
        return false
      }

      return true;
    }
  },

  decode: function(sch, parentSchema) {
    return function(data, obj) {
      let key = obj.parentDataProperty;
      obj.parentData[key] = sch[obj.parentData[key]];
      if (obj.parentData[key] == undefined) {
        delete(obj.parentData[key])
        return false
      }

      return true;
    }
  },

  "decode-array": function(sch, parentSchema) {

    return function(data, obj, a) {
      let key = obj.parentDataProperty;
      obj.parentData[key] =
        obj.parentData[key].map(d => sch[d]);

      if (obj.parentData[obj.parentDataProperty].includes(undefined)) {
        delete(obj.parentData[key])
        return false
      }

      return true;
    }
  },

}

module.exports.kTypes = {
  "encode": "string",
  "encode-array": "array",
  "decode": "integer",
  "decode-array": "array"
}


// Data dictionary sheets - as of 02/11/21
module.exports.Main = [{
    "Page-en": "Victim",
    "Page-ur": "",
    "Name": "first_name",
    "Input": "string",
    "Required": true,
    "Description-en": "First Name",
    "type": "string",
    "minLen": "",
    "maxLen": 20,
    "Values-en": "",
    "Description-ur": "",
    "Values-ur": "",
    "Notes": "",
    "": ""
  },
  {
    "Page-en": "",
    "Page-ur": "",
    "Name": "last_name",
    "Input": "string",
    "Required": true,
    "Description-en": "Last Name",
    "type": "string",
    "minLen": "",
    "maxLen": 20,
    "Values-en": "",
    "Description-ur": "",
    "Values-ur": "",
    "Notes": "",
    "": ""
  },
  {
    "Page-en": "",
    "Page-ur": "",
    "Name": "born",
    "Input": "string",
    "Required": "",
    "Description-en": "Birth Date",
    "type": "date",
    "minLen": "",
    "maxLen": "",
    "Values-en": "DD-MM-YYYY, YYYY-MM, YYYY",
    "Description-ur": "",
    "Values-ur": "",
    "Notes": "",
    "": ""
  },
  {
    "Page-en": "",
    "Page-ur": "",
    "Name": "gender",
    "Input": "single",
    "Required": "",
    "Description-en": "Gender",
    "type": "code",
    "minLen": "",
    "maxLen": "",
    "Values-en": "female, male, transgender",
    "Description-ur": "",
    "Values-ur": "",
    "Notes": "",
    "": ""
  },
  {
    "Page-en": "",
    "Page-ur": "",
    "Name": "education",
    "Input": "single",
    "Required": "",
    "Description-en": "Education Level",
    "type": "code",
    "minLen": "",
    "maxLen": "",
    "Values-en": "school1, school2, university, none, other",
    "Description-ur": "",
    "Values-ur": "",
    "Notes": "",
    "": ""
  },
  {
    "Page-en": "",
    "Page-ur": "",
    "Name": "occupation",
    "Input": "string",
    "Required": "",
    "Description-en": "Occupation",
    "type": "string",
    "minLen": "",
    "maxLen": 20,
    "Values-en": "unformed?",
    "Description-ur": "",
    "Values-ur": "",
    "Notes": "",
    "": ""
  },
  {
    "Page-en": "",
    "Page-ur": "",
    "Name": "caste",
    "Input": "single",
    "Required": "",
    "Description-en": "Caste",
    "type": "code",
    "minLen": "",
    "maxLen": "",
    "Values-en": "butt, jutt, rajpoot, sheikh, mughal, gujjar, qureshi ",
    "Description-ur": "",
    "Values-ur": "",
    "Notes": "",
    "": ""
  },
  {
    "Page-en": "",
    "Page-ur": "",
    "Name": "religion",
    "Input": "single",
    "Required": "",
    "Description-en": "Religion",
    "type": "code",
    "minLen": "",
    "maxLen": "",
    "Values-en": "muslim, hindu, christian, ahmadiyya, sikh, other",
    "Description-ur": "",
    "Values-ur": "",
    "Notes": "",
    "": ""
  },
  {
    "Page-en": "",
    "Page-ur": "",
    "Name": "ethnicity",
    "Input": "single",
    "Required": "",
    "Description-en": "Ethnicity",
    "type": "code",
    "minLen": "",
    "maxLen": "",
    "Values-en": "punjabi, pashtun, sindhi, saraiki, muhajir, baloch, other",
    "Description-ur": "",
    "Values-ur": "",
    "Notes": "",
    "": ""
  },
  {
    "Page-en": "Incident",
    "Page-ur": "",
    "Name": "hosp_med",
    "Input": "single",
    "Required": "",
    "Description-en": "Was hospitalization or medical care needed",
    "type": "boolean",
    "minLen": "",
    "maxLen": "",
    "Values-en": "true, false",
    "Description-ur": "",
    "Values-ur": "",
    "Notes": "",
    "": ""
  },
  {
    "Page-en": "",
    "Page-ur": "",
    "Name": "reason",
    "Input": "multiple",
    "Required": "",
    "Description-en": "Reason for torture",
    "type": "code-array",
    "minLen": "",
    "maxLen": "",
    "Values-en": "confession, information, recovery, others",
    "Description-ur": "",
    "Values-ur": "",
    "Notes": "",
    "": ""
  },
  {
    "Page-en": "",
    "Page-ur": "",
    "Name": "",
    "Input": "single",
    "Required": "",
    "Description-en": "Constituency: Provincial and national",
    "type": "code",
    "minLen": "",
    "maxLen": "",
    "Values-en": "*Constituencies",
    "Description-ur": "",
    "Values-ur": "",
    "Notes": "I shared a list with you earlier, pasting the list here again: For NA: https://www.ecp.gov.pk/Documents/delimitation2018/reports/02.National%20Assembly%20of%20Pakistan.pdf",
    "": "We just need to use the names and numbers given in the left most column"
  },
  {
    "Page-en": "",
    "Page-ur": "",
    "Name": "rep_name",
    "Input": "string",
    "Required": "",
    "Description-en": "Name of representative",
    "type": "string",
    "minLen": "",
    "maxLen": 30,
    "Values-en": "",
    "Description-ur": "",
    "Values-ur": "",
    "Notes": "To be filled manually as it may or may not change after every five years or so",
    "": ""
  },
  {
    "Page-en": "",
    "Page-ur": "",
    "Name": "rep_number",
    "Input": "undefined",
    "Required": "",
    "Description-en": "???",
    "type": "integer",
    "minLen": "",
    "maxLen": "",
    "Values-en": "???",
    "Description-ur": "",
    "Values-ur": "",
    "Notes": "Can you clarify, i don't understand",
    "": ""
  },
  {
    "Page-en": "",
    "Page-ur": "",
    "Name": "complaint_filed",
    "Input": "single",
    "Required": "",
    "Description-en": "Was a complaint filed",
    "type": "boolean",
    "minLen": "",
    "maxLen": "",
    "Values-en": "true, false",
    "Description-ur": "",
    "Values-ur": "",
    "Notes": "",
    "": ""
  },
  {
    "Page-en": "",
    "Page-ur": "",
    "Name": "complaint_date",
    "Input": "date",
    "Required": "",
    "Description-en": "Complaint date",
    "type": "date",
    "minLen": "",
    "maxLen": "",
    "Values-en": "DD-MM-YYYY, YYYY-MM, YYYY",
    "Description-ur": "",
    "Values-ur": "",
    "Notes": "",
    "": ""
  },
  {
    "Page-en": "",
    "Page-ur": "",
    "Name": "mlc_conducted",
    "Input": "single",
    "Required": "",
    "Description-en": "Was an MLC conducted",
    "type": "boolean",
    "minLen": "",
    "maxLen": "",
    "Values-en": "true, false",
    "Description-ur": "",
    "Values-ur": "",
    "Notes": "",
    "": ""
  },
  {
    "Page-en": "",
    "Page-ur": "",
    "Name": "mlc_law",
    "Input": "undefined",
    "Required": "",
    "Description-en": "Under what section of the law was the MLC ordered",
    "type": "string",
    "minLen": "",
    "maxLen": "",
    "Values-en": "unformed?",
    "Description-ur": "",
    "Values-ur": "",
    "Notes": "Will need to update",
    "": ""
  },
  {
    "Page-en": "",
    "Page-ur": "",
    "Name": "mlc_reason_notfiled",
    "Input": "undefined",
    "Required": "",
    "Description-en": "Reason for not filing an MLC",
    "type": "string",
    "minLen": "",
    "maxLen": "",
    "Values-en": "unformed?",
    "Description-ur": "",
    "Values-ur": "",
    "Notes": "",
    "": ""
  },
  {
    "Page-en": "",
    "Page-ur": "",
    "Name": "outcome",
    "Input": "single",
    "Required": "",
    "Description-en": "Outcome of the complaint",
    "type": "code",
    "minLen": "",
    "maxLen": "",
    "Values-en": "compromise, pending, perpetrator_punished, out_of_court_settlement",
    "Description-ur": "",
    "Values-ur": "",
    "Notes": "",
    "": ""
  },
  {
    "Page-en": "Detail",
    "Page-ur": "",
    "Name": "incidents",
    "Input": "array",
    "Required": "",
    "Description-en": "Incident Descriptions",
    "type": "array",
    "minLen": "",
    "maxLen": 20,
    "Values-en": "Incident",
    "Description-ur": "",
    "Values-ur": "",
    "Notes": "",
    "": ""
  }
];

module.exports.Incident = [{
    "Name": "date",
    "Required": "",
    "Input": "date",
    "type": "date",
    "minLen": "",
    "maxLen": "",
    "Description-en": "Date of incident",
    "Values-en": "DD-MM-YYYY",
    "Description-ur": "",
    "Values-ur": ""
  },
  {
    "Name": "incident_type",
    "Required": "",
    "Input": "single",
    "type": "code",
    "minLen": "",
    "maxLen": "",
    "Description-en": "Type of incident",
    "Values-en": "torture, custodial_death, custodial_rape",
    "Description-ur": "",
    "Values-ur": ""
  },
  {
    "Name": "place",
    "Required": "",
    "Input": "single",
    "type": "code",
    "minLen": "",
    "maxLen": "",
    "Description-en": "place of occurence",
    "Values-en": "police_lock_up, private_torture_cell, detention_centres, internment_camp, check_post, other",
    "Description-ur": "",
    "Values-ur": ""
  },
  {
    "Name": "during",
    "Required": "",
    "Input": "single",
    "type": "code",
    "minLen": "",
    "maxLen": "",
    "Description-en": "What was happening at the time of the incident",
    "Values-en": "arrest, interrogation, search_or_checking, other",
    "Description-ur": "",
    "Values-ur": ""
  },
  {
    "Name": "torture_type",
    "Required": "",
    "Input": "multiple",
    "type": "code-array",
    "minLen": "",
    "maxLen": "",
    "Description-en": "Type of torture",
    "Values-en": "physical, psychological, cultural_humiliation, sexual_violence",
    "Description-ur": "",
    "Values-ur": ""
  },
  {
    "Name": "torture_methods",
    "Required": "",
    "Input": "multiple",
    "type": "code-array",
    "minLen": "",
    "maxLen": "",
    "Description-en": "Method of Torture",
    "Values-en": "beating, cheera, chittar, danda, dolli, falaka, jack, manji, rolla, roller, strappado, sleep_deprivation, water_boarding, solitary_confinement, light_deprivation, sexual_violence, witnessing_other_people_being_tortured",
    "Description-ur": "",
    "Values-ur": ""
  },
  {
    "Name": "perpetrators",
    "Required": "",
    "Input": "array",
    "type": "array",
    "minLen": "",
    "maxLen": 20,
    "Description-en": "Perpetrators Description",
    "Values-en": "Perpetrator",
    "Description-ur": "",
    "Values-ur": ""
  }
];

module.exports.Perpetrator = [{
    "Name": "force",
    "Required": "",
    "Input": "single",
    "type": "code",
    "minLen": "",
    "maxLen": "",
    "Description-en": "Law Inforcement Agency",
    "Values-en": "counter_terrorism_department (CTD),  criminal_investigation_agency (CIA), Punjab Elite Force, Punjab Traffic Police, Punjab Dolphin Force, Paramilitary forces, military",
    "Description-ur": "",
    "Values-ur": ""
  },
  {
    "Name": "action",
    "Required": "",
    "Input": "single",
    "type": "code",
    "minLen": "",
    "maxLen": "",
    "Description-en": "Action taken against perpetrator",
    "Values-en": "temporary suspension, permanent suspension, transfer, demotion, other",
    "Description-ur": "",
    "Values-ur": ""
  },
  {
    "Name": "rank",
    "Required": "",
    "Input": "single",
    "type": "code",
    "minLen": "",
    "maxLen": "",
    "Description-en": "Rank of the perpetrator",
    "Values-en": "constable, head_constable, assistant_sub_inspector, sub_inspector_inspector, assistant_superintendent_of_police, deputy_superintendent_of_police, supeintendent_of_police, senior_superintendent/assistant_inspector_general_of_police, deputy_inspector_general_of_police, additional_inspector_general_of_police, insepctor_general_of_police",
    "Description-ur": "",
    "Values-ur": ""
  },
  {
    "Name": "posting",
    "Required": "",
    "Input": "string",
    "type": "string",
    "minLen": "",
    "maxLen": 20,
    "Description-en": "Police Station where posted",
    "Values-en": "to be filled manually/unformed",
    "Description-ur": "",
    "Values-ur": ""
  },
  {
    "Name": "superior",
    "Required": "",
    "Input": "string",
    "type": "string",
    "minLen": "",
    "maxLen": 20,
    "Description-en": "Perpetrator's immediate superior",
    "Values-en": "unformed?",
    "Description-ur": "",
    "Values-ur": ""
  }
];