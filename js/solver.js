var Solver = (function() {
  'use strict';

  var current_problem = null;
  var score = 0;
  var attempts = 0;
  var max_attempts = 3;

  function set_problem(problem) {
    current_problem = problem;
    attempts = 0;
  }

  function get_problem() {
    return current_problem;
  }

  function validate_answer(user_answer) {
    if (!current_problem) {
      return {
        correct: false,
        message: 'Tsy misy olana / Pas de problème'
      };
    }

    var parsed_answer = parseFloat(user_answer);
    
    if (isNaN(parsed_answer)) {
      return {
        correct: false,
        message: 'Soraty ny isa / Écrivez un nombre'
      };
    }

    var tolerance = 0.01;
    var is_correct = Math.abs(parsed_answer - current_problem.answer) < tolerance;

    if (is_correct) {
      var stars_earned = 0;
      if (attempts === 0) {
        stars_earned = 3;
      } else if (attempts === 1) {
        stars_earned = 2;
      } else {
        stars_earned = 1;
      }
      score += stars_earned;
      
      return {
        correct: true,
        message: 'Tsara! / Correct!',
        stars_earned: stars_earned
      };
    } else {
      attempts++;
      
      if (attempts >= max_attempts) {
        return {
          correct: false,
          message: 'Very ny famaliana / La réponse était: ' + current_problem.answer,
          show_answer: true
        };
      }
      
      return {
        correct: false,
        message: 'Andramo indray / Essayez encore (' + (max_attempts - attempts) + ')',
        attempts_left: max_attempts - attempts
      };
    }
  }

  function get_steps() {
    if (!current_problem) {
      return [];
    }
    return current_problem.steps;
  }

  function get_score() {
    return score;
  }

  function reset_score() {
    score = 0;
  }

  function get_stars_display() {
    var stars = [];
    for (var i = 0; i < 3; i++) {
      stars.push(i < score % 4 ? 'filled' : 'empty');
    }
    return stars;
  }

  return {
    set_problem: set_problem,
    get_problem: get_problem,
    validate_answer: validate_answer,
    get_steps: get_steps,
    get_score: get_score,
    reset_score: reset_score,
    get_stars_display: get_stars_display
  };
})();
