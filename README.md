# GameCenter - Salesforce Gaming Management System

A comprehensive Salesforce solution for tracking and managing gameplay data, player performance, and gaming analytics. This project demonstrates various Salesforce development concepts including custom objects, automation, validation, and Lightning Web Components.

## Project Overview

GameCenter is a custom Salesforce application that manages gaming data through a structured approach to track players, games, and gaming sessions with automated scoring and performance analytics.

## Core Data Model

### Custom Objects Created
- **Gamer**: Stores player information and profiles
- **Games**: Catalog of available games with difficulty ratings
- **GameSession**: Records of individual gaming sessions linking gamers to games

### Key Fields Implementation

**Gamer Object Fields:**
- `Gamer_ID__c` (Auto Number) - Unique identifier
- `Name` (Text) - Gamer display name
- `Email__c` (Email) - Contact information
- `Join_Date__c` (Date/Time) - Registration timestamp
- `Skill_Level__c` (Picklist) - Beginner/Intermediate/Advanced classification

**Games Object Fields:**
- `Difficulty_Level__c` - Game complexity rating

**GameSession Object Fields:**
- `Gamer__c` (Lookup) - References Gamer object
- `Game__c` (Lookup) - References Games object
- `Duration__c` - Session length (optional field)
- `Score__c` (Formula) - Calculated score based on duration and game difficulty
- `GamerValidation__c` (Checkbox) - Validation tracking field

## Salesforce Features Implemented

### 1. User Interface & Experience
- **Lightning App**: Custom app container for gaming management
- **Lightning Record Pages**: Tailored views for each object with:
  - Custom component placement
  - Related lists integration
  - Dynamic form displays
  - Enhanced user experience design

### 2. Data Analytics & Reporting
- **Skill Level Reports**: Three filtered reports categorizing gamers by skill level
  - Beginner players only
  - Intermediate players only  
  - Advanced players only

### 3. Data Validation & Quality
- **Validation Rules**: 
  - Game field validation in GameSession object
  - Gamer field validation in GameSession object
  - Cross-object validation using custom checkbox field

### 4. Process Automation
- **Flow Automation**: 
  - Default duration assignment (2 hours) for empty duration fields
  - Gamer validation flow for cross-object field validation
- **Apex Trigger**: `GameSessionValidationBeforeSave` trigger for advanced validation logic

### 5. Custom Lightning Web Component
- **scoreBoard Component**: Top 5 gamers leaderboard
  - Real-time data display using `@wire` decorator
  - Rank visualization with emoji icons (🥇🥈🥉)
  - SOQL integration through Apex controller
  - Error handling and loading states

## Technical Implementation Details

### Apex Controller
```apex
public with sharing class TopGamersController {
   @AuraEnabled(cacheable=true)
   public static List<GameSession__c> getTopGamers() {
       return [SELECT Gamer__r.Name, Score__c
               FROM GameSession__c
               ORDER BY Score__c DESC
               LIMIT 5];
   }
}
```

### Apex Trigger
```apex
trigger GameSessionValidationBeforeSave on GameSession__c (before insert, before update) {
    for (GameSession__c session : Trigger.new) {
        if (!session.GamerValidation__c){
            if (session.Gamer__c == null){
                session.GamerValidation__c = true;
            }
         }
     }
}
```

### Formula Field Logic
- **Score Calculation**: Automated scoring system based on:
  - GameSession duration
  - Game difficulty level
  - Mathematical formula combining both factors

## Development Tools Used
- Salesforce Developer Console
- Visual Studio Code with Salesforce extensions
- Lightning Web Components framework
- Salesforce Object Query Language (SOQL)

## Skills Demonstrated
- **Salesforce Administration**: Custom objects, fields, and data modeling
- **Lightning Platform**: App builder, record pages, and user interface design
- **Process Automation**: Flows, validation rules, and business logic
- **Apex Development**: Triggers, controllers, and server-side logic
- **Lightning Web Components**: Modern JavaScript framework for Salesforce
- **Data Analytics**: Reporting, filtering, and performance metrics
- **Integration Patterns**: Component communication and data binding

## Future Enhancement Opportunities
- Integration with external gaming APIs
- Advanced analytics dashboards
- Mobile-responsive design improvements
- Multi-language support
- Tournament management features

---

*This project serves as a comprehensive demonstration of Salesforce platform capabilities, combining declarative development (clicks) with programmatic solutions (code) to create a fully functional gaming management system.*
