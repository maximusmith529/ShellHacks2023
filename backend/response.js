class returnInfo {
	constructor() {
		this.potentionalAction = null;
		this.messageToPlayer = null;
		this.environmentEffects = {
			inForest: null,
			inCave: null,
			inTown: null,
			inDungeon: null,
			lightLevel: null,
			isRaining: null,
			isSnowing: null,
		};
	}
	addPotentialAction(action) {
		this.potentialAction = action;
	}
	setMessageToPlayer(message) {
		this.messageToPlayer = messageToPlayer;
	}

	setRequiredRoll(value) {
		this.requiredRollType = value;
		this.requiredDC;
	}
}
