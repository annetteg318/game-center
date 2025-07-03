public with sharing class TopGamersController {
    @AuraEnabled(cacheable=true)
    public static List<GameSession__c> getTopGamers() {
        return [SELECT Gamer__r.Name, Score__c
                FROM GameSession__c
                ORDER BY Score__c DESC
                LIMIT 5];
    }
}