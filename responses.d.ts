
export type actionResponse = {
  id : any
  noun : any
  verb : any
  slug : any
  module_name : any
  count : any
  created_at : any
  updated_at : any
  created_time : any
  updated_time : any
};

export type answerResponse = {
  id : any
  answer : any
  created_at : any
  updated_at : any
  created_time : any
  updated_time : any
};

export type categoryResponse = {
  status : any
  created_at : any
  updated_at : any
  created_time : any
  updated_time : any
  id : any
};

export type faqResponse = {
  question : any
  id : any
  status : any
  answer : any
  created_at : any
  updated_at : any
  created_time : any
  updated_time : any
};

export type pageResponse = {
  name : any
  id : any
  status : any
  created_at : any
  updated_at : any
  images : any
};

export type page_imageResponse = {
  image : any
  id : any
  page_id : any
  created_at : any
  updated_at : any
};

export type permission_groupResponse = {
  id : any
  status : any
  created_at : any
  updated_at : any
  created_time : any
  updated_time : any
};

export type settingResponse = {
  value : any
  id : any
  name : any
  slug : any
  setting_type : any
  created_at : any
  updated_at : any
  created_time : any
  updated_time : any
};

export type userResponse = {
  id : any
  name : any
  email : any
  permission_group_id : any
  token : any
  status : any
  created_at : any
  updated_at : any
  created_time : any
  updated_time : any
};
