function LevelManager(mapDesign, soundManager){
    this.mapDesign = mapDesign;
    this.soundManager = soundManager;
}

LevelManager.prototype.mapDesign;

LevelManager.prototype.resetGame = function() {
    location.reload();
}

LevelManager.prototype.getDeadFaction = function(players) {
    let deadFaction;

    const humanMobsAlive = players.human.units.mobs.length,
          humanTownsAlive = players.human.units.towns.length,
          aiMobsAlive = players.ai.units.mobs.length;

    if (!humanMobsAlive || !humanTownsAlive) {
        deadFaction = 'human';

    } else if (!aiMobsAlive) {
        deadFaction = 'ai';
    }

    return deadFaction;
}

LevelManager.prototype.announceEndOfLevel = function(audioFile, alertMessage) {
    this.soundManager.sfx.play(audioFile);
    alert(alertMessage);
}

// Check that there are still units in both sides; if not, victory one of the two factions wins
LevelManager.prototype.checkEndOfLevelCondition = function(currentMapLevel, players) {
    const victory_message_eng = 'Victory! The area is safe again.',
          victory_message_spa = '¡Victoria! La zona vuelve a ser segura.',
          defeat_message_eng = 'The Barbarians are everywhere! Rome will fall...',
          defeat_message_spa = '¡Los Bárbaros están por todos lados! Roma caerá...',

          deadFaction = this.getDeadFaction(players);

    // Player have to destroy all barbarians soldiers and towns. AI wins just by killing all roman soldiers.
    if (deadFaction === 'human') {
        this.announceEndOfLevel('defeat', defeat_message_eng);

    } else if (deadFaction === 'ai') {
        this.announceEndOfLevel('victory', victory_message_eng);
        currentMapLevel++;
        this.showNextMapMsg(currentMapLevel);

    } else {
        currentMapLevel = null;
    }
    return currentMapLevel;
}

// Advance to the next level. If it's last level, show victory message and end game. Uses cookie for storing current level.
LevelManager.prototype.showNextMapMsg = function(currentMapLevel) {
    const maps_messages_eng = [
        '',
        'Welcome! You are a Roman General and you have been informed that some nasty Barbarians are assaulting little towns outside Rome. Use your soldiers to finish the enemy and recover control over those towns!',
        'Even little mountain towns have the right to be protected against the sadistic Barbarians!',
        'Those damn uncivilized folks! They aren\'t even able to organize for battle...',
        'Your explorer asures you that the road is safe... but something smells bad... it\'s like the smell of people that haven\'t wash for years!',
        'Damn it! Your explorer lured us to the enemy den. There\'re enemies everywhere!',
        'The traitor explorer is hidding somewhore in this barbarian valley... it\'s time for revenge!',
        'While our troops were in the valley, a giant wolf pack is causing chaos on nearby towns, lured by blood!',
        'Those Barbarians sure know how to ambush people on the mountains... but they\'ll never overcome the iron discipline of the Roman army!',
        'Finally... you arrive to the main Barbarian camp... but you are all alone. Regroup and finish the enemy!',
        'Rome reinforcements are here! Time to finish with the lasts of the Barbarians... For Rome!',
        'test1',
        'test2'
    ],

          maps_messages_spa = [
              '',
              '¡Bienvenido! Has sido informado de que unos bárbaros están asaltando los pueblos de los alrededores de Roma. ¡Utiliza tus soldados para acabar con el enemigo y recupera esos pueblos!',
              '¡Incluso los pequeños pueblos de las montañas merecen ser protegidos de los sádicos Bárbaros!',
              'Estos malditos incivilizados no son siquiera capaces de formar para la batalla...',
              'Tu explorador te ha asegurado que el paso es seguro... pero algo huele mal... como a gente que hace años que no se baña...',
              '¡Maldición! Tu explorador te ha llevado de lleno a la boca del lobo. ¡Hay enemigos por todas partes!',
              'Tu explorador traidor se oculta en algún lugar de este valle lleno de bárbaros... es hora de la venganza',
              '¡Mientras nuestras tropas estaban destacadas en el valle, una manada gigantesca de lobos rodean los poblados cercanos atraidos por la sangre!',
              'Estos bárbaros son buenos tendiendo emboscadas en las montañas... ¡Pero nunca vencerán a la férrea disciplina del ejército Romano!',
              'Al fin... has llegado al campamento principal de los Bárbaros... aunque solo quedas tú. ¡Reúne fuerzas y acaba con ellos!',
              '¡Han llegado los refuerzos que Roma prometió...! Es hora de terminar con los últimos supervivientes bárbaros... ¡Por Roma!'
          ],

          win_message_eng = 'Congratulations, you completed the game! Those Barbarians won\'t be a threat for our beloved Rome anymore... right?',

          win_message_spa = '¡Felicidades, has completado el juego! Esos bárbaros no volverán a amenazar la bella Roma... ¿O tal vez ésto solo sea el principio?';

    if (currentMapLevel >= this.mapDesign.blueprints.length){
        alert(win_message_eng);
        // Restart game
        this.resetGame();

    } else {
        alert(maps_messages_eng[currentMapLevel]);
    }
}
