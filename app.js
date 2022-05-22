// Common functions
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const app = Vue.createApp({
    data() {
        return {
            monsterHealth: 100,
            playerHealth: 100,
            roundCount: 0,
            winner: null,
            logMessages: [],
        }
    },

    watch: {
        playerHealth(newValue) {

            if (newValue < 0 && this.monsterHealth < 0) {

                this.winner = 'draw';

            } else if (newValue < 0) {

                this.winner = 'monster';
            }

        },

        monsterHealth(newValue) {

            if (newValue < 0 && this.playerHealth < 0) {

                this.winner = 'draw';

            } else if (newValue < 0) {

                this.winner = 'player';

            }

        },
    },

    computed: {
        monsterBarStyles() {
            if (this.monsterHealth < 0) {
                return {
                    width: '0%'
                }
            }

            return {
                width: this.monsterHealth + '%'
            }
        },

        playerBarStyles() {
            if (this.playerHealth < 0) {
                return {
                    width: '0%'
                }
            }

            return {
                width: this.playerHealth + '%'
            }
        },
    },

    methods: {
        attackMonster() {

            this.roundCount++;

            const damageDealt = randomIntFromInterval(5, 8);

            this.monsterHealth -= damageDealt;

            this.monsterAttack();

            this.addLogMessages('player', 'attacks', damageDealt);

        },

        monsterAttack() {

            const damageDealt = randomIntFromInterval(7, 10);

            this.playerHealth -= damageDealt;

            this.addLogMessages('monster', 'attacks', damageDealt);

        },

        specialAttack() {

            this.roundCount++;

            const damageDealt = randomIntFromInterval(15, 20);

            this.monsterHealth -= damageDealt;

            this.monsterAttack();

            this.addLogMessages('player', 'special-attack', damageDealt);

        },

        heal() {

            const healAmount = randomIntFromInterval(8, 10);

            if (this.roundCount > 3) {

                if (this.playerHealth + healAmount > 100) {

                    this.playerHealth = 100;

                } else {

                    this.playerHealth += healAmount;

                }

                this.monsterAttack();

                this.roundCount = 0;

                this.addLogMessages('player', 'heal', healAmount);

            }

            return;

        },

        surrender() {

            this.winner = 'monster';

        },

        restart() {
            this.monsterHealth = 100;
            this.playerHealth = 100;
            this.roundCount = 0;
            this.winner = null;
            this.logMessages = [];
        },

        addLogMessages(who, action, value) {
            this.logMessages.unshift({
                actionBy: who,
                actionType: action,
                value: value
            });
        }

    }
})

app.mount('#game')