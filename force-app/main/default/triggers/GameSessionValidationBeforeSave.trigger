trigger GameSessionValidationBeforeSave on GameSession__c (before insert, before update) {
    for (GameSession__c session : Trigger.new) {
        if (!session.GamerValidation__c){
            if (session.Gamer__c == null){
                session.GamerValidation__c = true;
            }
         }
     }
}