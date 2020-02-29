function isThisType(val){
  for(let key in this){
    console.log('key',key,'  val',this[key])
    if(this[key] == val){
      return true
    }
  }
  return false

};

export const ComponentCode = {
  SMS_LOGIN:'sms_login',
  ID_CARD:'idcard',
  BANKCARD:'bankcard',
  sms_verify:'sms_verify',
  isThisType
}
