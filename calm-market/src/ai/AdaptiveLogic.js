// AdaptiveLogic.js
// Tracks player performance and suggests difficulty adjustments

class AdaptiveLogic {
    constructor() {
        this.history = [];
        this.startTime = Date.now();
    }

    startLevel() {
        this.startTime = Date.now();
    }

    recordAttempt(isCorrect) {
        const timeTaken = (Date.now() - this.startTime) / 1000;
        this.history.push({ isCorrect, timeTaken });

        // Keep history short (last 5 attempts)
        if (this.history.length > 5) this.history.shift();
    }

    getSuggestion() {
        if (this.history.length < 3) return 'stay';

        const avgTime = this.history.reduce((sum, h) => sum + h.timeTaken, 0) / this.history.length;
        const correctRate = this.history.filter(h => h.isCorrect).length / this.history.length;

        // If very fast and correct -> Increase Difficulty
        if (correctRate === 1 && avgTime < 5) return 'increase';

        // If struggling (slow or errors) -> Decrease Difficulty or Hint
        if (correctRate < 0.6 || avgTime > 15) return 'decrease';

        return 'stay';
    }
}

export default new AdaptiveLogic();
