var ProblemGenerator = (function() {
  'use strict';

  function random_int(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function generate_debutant() {
    var operations = ['add', 'subtract'];
    var operation = operations[random_int(0, 1)];
    var a, b, question, steps, answer;

    if (operation === 'add') {
      a = random_int(1, 50);
      b = random_int(1, 49);
      answer = a + b;
      question = a + ' + ' + b + ' = ?';
      steps = [
        'Manampy ny ' + a + ' sy ny ' + b,
        a + ' + ' + b + ' = ' + answer
      ];
    } else {
      a = random_int(2, 99);
      b = random_int(1, a - 1);
      answer = a - b;
      question = a + ' - ' + b + ' = ?';
      steps = [
        'Manala ny ' + b + ' amin\'ny ' + a,
        a + ' - ' + b + ' = ' + answer
      ];
    }

    return {
      tier: 'debutant',
      question: question,
      answer: answer,
      steps: steps
    };
  }

  function generate_intermediaire() {
    var operations = ['multiply', 'divide', 'negative_add', 'negative_subtract'];
    var operation = operations[random_int(0, 3)];
    var a, b, question, steps, answer;

    if (operation === 'multiply') {
      a = random_int(2, 12);
      b = random_int(2, 10);
      answer = a * b;
      question = a + ' × ' + b + ' = ?';
      steps = [
        'Manamarina ny ' + a + ' indroa ' + b,
        a + ' × ' + b + ' = ' + answer
      ];
    } else if (operation === 'divide') {
      b = random_int(2, 9);
      answer = random_int(2, 12);
      a = b * answer;
      question = a + ' ÷ ' + b + ' = ?';
      steps = [
        'Mizara ny ' + a + ' amin\'ny ' + b,
        a + ' ÷ ' + b + ' = ' + answer
      ];
    } else if (operation === 'negative_add') {
      a = random_int(-20, -1);
      b = random_int(1, 20);
      answer = a + b;
      question = '(' + a + ') + ' + b + ' = ?';
      steps = [
        'Manampy ny ' + a + ' sy ny ' + b,
        a + ' + ' + b + ' = ' + answer
      ];
    } else {
      a = random_int(1, 20);
      b = random_int(1, 20);
      answer = a - b;
      question = a + ' - ' + b + ' = ?';
      steps = [
        'Manala ny ' + b + ' amin\'ny ' + a,
        a + ' - ' + b + ' = ' + answer
      ];
    }

    return {
      tier: 'intermediaire',
      question: question,
      answer: answer,
      steps: steps
    };
  }

  function generate_avance() {
    var operations = ['fraction_add', 'decimal_mult', 'percentage'];
    var operation = operations[random_int(0, 2)];
    var a, b, question, steps, answer;

    if (operation === 'fraction_add') {
      var denom = random_int(2, 8);
      var num1 = random_int(1, denom - 1);
      var num2 = random_int(1, denom - 1);
      var sum_num = num1 + num2;
      question = num1 + '/' + denom + ' + ' + num2 + '/' + denom + ' = ?';
      
      if (sum_num === denom) {
        answer = 1;
        steps = [
          'Manampy ny numerators: ' + num1 + ' + ' + num2 + ' = ' + sum_num,
          sum_num + '/' + denom + ' = 1'
        ];
      } else if (sum_num > denom) {
        var whole = Math.floor(sum_num / denom);
        var remainder = sum_num % denom;
        answer = parseFloat((whole + remainder / denom).toFixed(2));
        steps = [
          'Manampy ny numerators: ' + num1 + ' + ' + num2 + ' = ' + sum_num,
          sum_num + '/' + denom + ' = ' + whole + ' ' + remainder + '/' + denom,
          'Valiny: ' + answer
        ];
      } else {
        answer = parseFloat((sum_num / denom).toFixed(2));
        steps = [
          'Manampy ny numerators: ' + num1 + ' + ' + num2 + ' = ' + sum_num,
          sum_num + '/' + denom + ' ≈ ' + answer
        ];
      }
    } else if (operation === 'decimal_mult') {
      a = random_int(1, 9) + 0.5;
      b = random_int(1, 5);
      answer = parseFloat((a * b).toFixed(1));
      question = a + ' × ' + b + ' = ?';
      steps = [
        'Manamarina ny ' + a + ' indroa ' + b,
        a + ' × ' + b + ' = ' + answer
      ];
    } else {
      var percent = random_int(10, 90);
      var base = random_int(10, 100);
      answer = Math.round((percent / 100) * base);
      question = percent + '% ny ' + base + ' = ?';
      steps = [
        percent + '% = ' + percent + '/100',
        '(' + percent + '/100) × ' + base + ' = ' + answer
      ];
    }

    return {
      tier: 'avance',
      question: question,
      answer: answer,
      steps: steps
    };
  }

  function generate_expert() {
    var operations = ['geometry_area', 'geometry_perimeter', 'algebra_solve'];
    var operation = operations[random_int(0, 2)];
    var a, b, question, steps, answer;

    if (operation === 'geometry_area') {
      var shapes = ['rectangle', 'triangle'];
      var shape = shapes[random_int(0, 1)];
      
      if (shape === 'rectangle') {
        a = random_int(2, 10);
        b = random_int(2, 10);
        answer = a * b;
        question = 'Area rectangle: L = ' + a + ', l = ' + b;
        steps = [
          'Formula: Area = L × l',
          'Area = ' + a + ' × ' + b,
          'Area = ' + answer
        ];
      } else {
        a = random_int(2, 10);
        b = random_int(2, 10);
        answer = Math.round((a * b) / 2);
        question = 'Area triangle: b = ' + a + ', h = ' + b;
        steps = [
          'Formula: Area = (b × h) / 2',
          'Area = (' + a + ' × ' + b + ') / 2',
          'Area = ' + (a * b) + ' / 2',
          'Area = ' + answer
        ];
      }
    } else if (operation === 'geometry_perimeter') {
      var sides = random_int(3, 6);
      var side_length = random_int(2, 8);
      answer = sides * side_length;
      question = 'Perimeter polygon regular: n = ' + sides + ', cote = ' + side_length;
      steps = [
        'Formula: Perimeter = n × cote',
        'Perimeter = ' + sides + ' × ' + side_length,
        'Perimeter = ' + answer
      ];
    } else {
      var coef = random_int(2, 5);
      var constant = random_int(1, 20);
      var result = random_int(10, 50);
      answer = Math.round((result - constant) / coef);
      question = coef + 'x + ' + constant + ' = ' + result + '. Find x.';
      steps = [
        coef + 'x + ' + constant + ' = ' + result,
        coef + 'x = ' + result + ' - ' + constant,
        coef + 'x = ' + (result - constant),
        'x = ' + (result - constant) + ' / ' + coef,
        'x = ' + answer
      ];
    }

    return {
      tier: 'expert',
      question: question,
      answer: answer,
      steps: steps
    };
  }

  function generate_problem(tier) {
    switch (tier) {
      case 'debutant':
        return generate_debutant();
      case 'intermediaire':
        return generate_intermediaire();
      case 'avance':
        return generate_avance();
      case 'expert':
        return generate_expert();
      default:
        return generate_debutant();
    }
  }

  return {
    generate_problem: generate_problem
  };
})();
