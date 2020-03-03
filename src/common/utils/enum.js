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
  SMS_VERIFY:'sms_verify',
  isThisType
}
