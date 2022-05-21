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
        }
    },

    watch: {
        playerHealth(newValue) {

            if (newValue < 0 && this.monsterHealth < 0) {

                // Draw
                this.winner = 'draw';

            } else if (newValue < 0) {

                // You Lost
                this.winner = 'monster';
            }

        },

        monsterHealth(newValue) {

            if (newValue < 0 && this.playerHealth < 0) {

                // Draw
                this.winner = 'draw';

            } else if (newValue < 0) {

                // You Won
                this.winner = 'player';

            }

        },
    },

    computed: {
        monsterBarStyles() {
            return {
                width: this.monsterHealth + '%'
            }
        },

        playerBarStyles() {
            return {
                width: this.playerHealth + '%'
            }
        },

        endGame() {
            return
        }
    },

    methods: {
        attackMonster() {

            this.roundCount++;

            const damageDealt = randomIntFromInterval(5, 8);

            this.monsterHealth -= damageDealt;

            this.monsterAttack();

        },

        monsterAttack() {

            const damageDealt = randomIntFromInterval(7, 10);

            this.playerHealth -= damageDealt;

        },

        specialAttack() {

            this.roundCount++;

            const damageDealt = randomIntFromInterval(15, 20);

            this.monsterHealth -= damageDealt;

            this.monsterAttack();

        },

        heal() {

            const healAmount = randomIntFromInterval(8, 10);

            if (this.roundCount > 3) {

                if (this.playerHealth + healAmount > 100) {

                    this.playerHealth = 100;

                } else {

                    this.playerHealth += healAmount;

                }

                this.roundCount = 0;

            }

            return;

        },

        surrender() {

            window.alert('Shameless Surrender');

        }

    }
})

app.mount('#game')