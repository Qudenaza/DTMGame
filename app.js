function randomNumber(min, max) {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1));
}

let app = new Vue({
  el: '#app',
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsStarted: false,
    result: false,
    log: []
  },
  watch: {
    result: function() {
      this.result ? this.giveUp() : null;
    }
  },
  methods: {
    startGame: function() {
      this.gameIsStarted = true;

      this.playerHealth = 100;
      this.monsterHealth = 100;

      this.log.length = 0;
    },
    playerAttack: function(min, max) {
      const rand = randomNumber(min, max);

      if (this.monsterHealth <= rand) {
        this.monsterHealth = 0;

        this.result = confirm('Вы выйграли, начать заного?');

        if (!this.result) this.gameIsStarted = false;

        return;
      }

      this.monsterHealth -= rand;

      this.log.unshift({
        color: 'blue',
        backgroundColor: 'lightgreen',
        text: `Player hits monster for ${rand}`
      });
    },
    monsterAttack: function() {
      const rand = randomNumber(1, 10);

      if (this.playerHealth <= rand) {
        this.playerHealth = 0;

        this.result = confirm('Вы проиграли, начать заного?');

        if (!this.result) this.gameIsStarted = false;

        return;
      }

      this.playerHealth -= rand;

      this.log.unshift({
        color: 'red',
        backgroundColor: 'pink',
        text: `Monster hits player for ${rand}`
      });
    },
    attack: function(superAttack) {
      superAttack ? this.playerAttack(10, 15) : this.playerAttack(1, 10); // Атака игрока

      this.monsterAttack(); // Атака монстра
    },
    heal: function() {
      const rand = randomNumber(1, 10);

      this.playerHealth <= 90 ? (this.playerHealth += rand) : this.playerHealth; // Пополнение жизни игроком

      this.monsterAttack(); // Атака монстра

      this.log.unshift({
        color: 'green',
        backgroundColor: 'lightgreen',
        text: `Player hils himself at ${rand}`
      });
    },
    giveUp: function() {
      this.playerHealth = 100;
      this.monsterHealth = 100;

      this.gameIsStarted = false;

      this.result = false;

      this.log.length = 0;
    }
  }
});
