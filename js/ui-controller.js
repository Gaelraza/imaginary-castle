var UIController = (function() {
  'use strict';

  var current_lang = 'mg';
  var current_tier = null;
  var session_active = false;

  var translations = {
    mg: {
      page_title: 'Mpanampy Matematika',
      tier_debutant: 'Débutant',
      tier_debutant_desc: 'Addition sy soustraction (1-99)',
      tier_intermediaire: 'Intermédiaire',
      tier_intermediaire_desc: 'Multiplication, division, négatifs',
      tier_avance: 'Avancé',
      tier_avance_desc: 'Fractions, décimales, pourcentages',
      tier_expert: 'Expert',
      tier_expert_desc: 'Géométrie, algèbre intro',
      score_label: 'Score:',
      submit_answer: 'Alefa',
      show_steps: 'Aseho ny dingana',
      next_problem: 'Manaraka',
      back_to_tiers: 'Miverina',
      support_banner: 'Manampiana',
      modal_title: 'Misaotra Tompo!',
      modal_text: 'Misaotra betsaka noho ny fanohanana anay!',
      modal_thanks_fr: 'Merci beaucoup pour votre soutien!',
      modal_close: 'Afaka',
      placeholder_name: '[PLACEHOLDER_NAME]',
      placeholder_number: '[PLACEHOLDER_NUMBER]'
    },
    fr: {
      page_title: 'Math Helper',
      tier_debutant: 'Débutant',
      tier_debutant_desc: 'Addition et soustraction (1-99)',
      tier_intermediaire: 'Intermédiaire',
      tier_intermediaire_desc: 'Multiplication, division, négatifs',
      tier_avance: 'Avancé',
      tier_avance_desc: 'Fractions, décimales, pourcentages',
      tier_expert: 'Expert',
      tier_expert_desc: 'Géométrie, algèbre intro',
      score_label: 'Score:',
      submit_answer: 'Envoyer',
      show_steps: 'Montrer les étapes',
      next_problem: 'Suivant',
      back_to_tiers: 'Retour',
      support_banner: 'Soutien',
      modal_title: 'Merci Beaucoup!',
      modal_text: 'Merci infiniment pour votre soutien!',
      modal_thanks_fr: 'Thank you for your support!',
      modal_close: 'Fermer',
      placeholder_name: '[PLACEHOLDER_NAME]',
      placeholder_number: '[PLACEHOLDER_NUMBER]'
    }
  };

  function init() {
    setup_language_toggle();
    setup_tier_selection();
    setup_problem_controls();
    setup_support_banner();
    update_translations();
  }

  function setup_language_toggle() {
    var lang_buttons = document.querySelectorAll('.lang-btn');
    
    lang_buttons.forEach(function(btn) {
      btn.addEventListener('click', function() {
        var lang = this.getAttribute('data-lang');
        
        if (lang !== current_lang) {
          current_lang = lang;
          
          lang_buttons.forEach(function(b) {
            b.classList.remove('active');
          });
          this.classList.add('active');
          
          update_translations();
        }
      });
    });
  }

  function update_translations() {
    var elements = document.querySelectorAll('[data-i18n]');
    var t = translations[current_lang];
    
    elements.forEach(function(el) {
      var key = el.getAttribute('data-i18n');
      if (t[key]) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = t[key];
        } else {
          el.textContent = t[key];
        }
      }
    });

    document.getElementById('page-title').textContent = t.page_title;
  }

  function setup_tier_selection() {
    var tier_cards = document.querySelectorAll('.tier-card');
    
    tier_cards.forEach(function(card) {
      card.addEventListener('click', function() {
        var tier = this.getAttribute('data-tier');
        select_tier(tier);
      });
    });
  }

  function select_tier(tier) {
    current_tier = tier;
    session_active = true;
    
    var main_container = document.getElementById('main-container');
    main_container.classList.add('session-active');
    
    var tier_selection = document.getElementById('tier-selection');
    var problem_section = document.getElementById('problem-section');
    
    tier_selection.classList.add('hidden');
    problem_section.classList.remove('hidden');
    
    load_new_problem();
  }

  function load_new_problem() {
    if (!current_tier) {
      return;
    }
    
    Solver.reset_score();
    update_stars_display();
    
    var problem = ProblemGenerator.generate_problem(current_tier);
    Solver.set_problem(problem);
    
    var question_el = document.getElementById('problem-question');
    question_el.textContent = problem.question;
    
    var answer_input = document.getElementById('answer-input');
    answer_input.value = '';
    answer_input.classList.remove('correct', 'incorrect');
    answer_input.disabled = false;
    
    var submit_btn = document.getElementById('submit-answer');
    submit_btn.classList.remove('hidden');
    
    var show_steps_btn = document.getElementById('show-steps');
    show_steps_btn.classList.add('hidden');
    
    var next_btn = document.getElementById('next-problem');
    next_btn.classList.add('hidden');
    
    var feedback = document.getElementById('feedback-message');
    feedback.classList.remove('visible', 'success', 'error');
    
    var steps_container = document.getElementById('steps-container');
    steps_container.classList.remove('visible');
    steps_container.innerHTML = '';
  }

  function setup_problem_controls() {
    var submit_btn = document.getElementById('submit-answer');
    var show_steps_btn = document.getElementById('show-steps');
    var next_btn = document.getElementById('next-problem');
    var back_btn = document.getElementById('back-to-tiers');
    var answer_input = document.getElementById('answer-input');
    
    submit_btn.addEventListener('click', handle_submit);
    show_steps_btn.addEventListener('click', handle_show_steps);
    next_btn.addEventListener('click', load_new_problem);
    back_btn.addEventListener('click', handle_back_to_tiers);
    
    answer_input.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        if (!submit_btn.classList.contains('hidden')) {
          handle_submit();
        } else if (!next_btn.classList.contains('hidden')) {
          load_new_problem();
        }
      }
    });
  }

  function handle_submit() {
    var answer_input = document.getElementById('answer-input');
    var user_answer = answer_input.value.trim();
    
    if (!user_answer) {
      return;
    }
    
    var result = Solver.validate_answer(user_answer);
    var feedback = document.getElementById('feedback-message');
    
    feedback.textContent = result.message;
    feedback.classList.remove('success', 'error');
    
    if (result.correct) {
      answer_input.classList.add('correct');
      answer_input.classList.remove('incorrect');
      answer_input.disabled = true;
      
      feedback.classList.add('success', 'visible');
      
      var submit_btn = document.getElementById('submit-answer');
      submit_btn.classList.add('hidden');
      
      var show_steps_btn = document.getElementById('show-steps');
      show_steps_btn.classList.remove('hidden');
      
      var next_btn = document.getElementById('next-problem');
      next_btn.classList.remove('hidden');
      
      update_stars_display();
    } else {
      answer_input.classList.add('incorrect');
      answer_input.classList.remove('correct');
      
      feedback.classList.add('error', 'visible');
      
      if (result.show_answer) {
        answer_input.disabled = true;
        var submit_btn = document.getElementById('submit-answer');
        submit_btn.classList.add('hidden');
        
        var show_steps_btn = document.getElementById('show-steps');
        show_steps_btn.classList.remove('hidden');
        
        var next_btn = document.getElementById('next-problem');
        next_btn.classList.remove('hidden');
      }
    }
  }

  function handle_show_steps() {
    var steps = Solver.get_steps();
    var steps_container = document.getElementById('steps-container');
    
    steps_container.innerHTML = '';
    
    steps.forEach(function(step, index) {
      var step_el = document.createElement('div');
      step_el.className = 'step-item';
      
      if (index === steps.length - 1) {
        step_el.classList.add('final');
      }
      
      step_el.textContent = (index + 1) + '. ' + step;
      steps_container.appendChild(step_el);
    });
    
    steps_container.classList.add('visible');
    
    var show_steps_btn = document.getElementById('show-steps');
    show_steps_btn.classList.add('hidden');
  }

  function handle_back_to_tiers() {
    session_active = false;
    current_tier = null;
    
    var main_container = document.getElementById('main-container');
    main_container.classList.remove('session-active');
    
    var tier_selection = document.getElementById('tier-selection');
    var problem_section = document.getElementById('problem-section');
    
    tier_selection.classList.remove('hidden');
    problem_section.classList.add('hidden');
    
    Solver.reset_score();
  }

  function update_stars_display() {
    var score = Solver.get_score();
    var stars_container = document.getElementById('stars-container');
    var max_display_stars = 5;
    
    stars_container.innerHTML = '';
    
    for (var i = 0; i < max_display_stars; i++) {
      var star = document.createElement('span');
      star.className = 'star';
      
      if (i < Math.min(score, max_display_stars)) {
        star.classList.remove('empty');
      } else {
        star.classList.add('empty');
      }
      
      star.textContent = '★';
      stars_container.appendChild(star);
    }
  }

  function setup_support_banner() {
    var banner = document.getElementById('support-banner');
    var modal_overlay = document.getElementById('modal-overlay');
    var modal_close = document.getElementById('modal-close');
    
    banner.addEventListener('click', function() {
      modal_overlay.classList.add('active');
    });
    
    modal_close.addEventListener('click', function() {
      modal_overlay.classList.remove('active');
    });
    
    modal_overlay.addEventListener('click', function(e) {
      if (e.target === modal_overlay) {
        modal_overlay.classList.remove('active');
      }
    });
  }

  return {
    init: init
  };
})();

document.addEventListener('DOMContentLoaded', function() {
  UIController.init();
});
