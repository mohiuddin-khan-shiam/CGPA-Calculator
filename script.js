/**
 * CGPA Calculator & Academic Planner
 * Modern, interactive, accessible JavaScript engine
 * Author: S. M. Mohiuddin Khan Shiam
 */

(() => {
  'use strict';

  // ==========================================================================
  // 1. Grading Scale Configurations
  // ==========================================================================
  const GRADE_SCALES = {
    '4': {
      max: 4.0,
      name: '4.00 Scale (Standard)',
      grades: [
        { label: 'A+ (4.00)', value: 4.0 },
        { label: 'A (4.00)', value: 4.0 },
        { label: 'A- (3.70)', value: 3.7 },
        { label: 'B+ (3.30)', value: 3.3 },
        { label: 'B (3.00)', value: 3.0 },
        { label: 'B- (2.70)', value: 2.7 },
        { label: 'C+ (2.30)', value: 2.3 },
        { label: 'C (2.00)', value: 2.0 },
        { label: 'C- (1.70)', value: 1.7 },
        { label: 'D+ (1.30)', value: 1.3 },
        { label: 'D (1.00)', value: 1.0 },
        { label: 'F (0.00)', value: 0.0 }
      ]
    },
    '4.33': {
      max: 4.33,
      name: '4.33 Scale',
      grades: [
        { label: 'A+ (4.33)', value: 4.33 },
        { label: 'A (4.00)', value: 4.0 },
        { label: 'A- (3.67)', value: 3.67 },
        { label: 'B+ (3.33)', value: 3.33 },
        { label: 'B (3.00)', value: 3.0 },
        { label: 'B- (2.67)', value: 2.67 },
        { label: 'C+ (2.33)', value: 2.33 },
        { label: 'C (2.00)', value: 2.0 },
        { label: 'C- (1.67)', value: 1.67 },
        { label: 'D (1.00)', value: 1.0 },
        { label: 'F (0.00)', value: 0.0 }
      ]
    },
    '5': {
      max: 5.0,
      name: '5.00 Scale',
      grades: [
        { label: 'A / 5.0 (5.00)', value: 5.0 },
        { label: 'A- (4.50)', value: 4.5 },
        { label: 'B+ (4.00)', value: 4.0 },
        { label: 'B (3.50)', value: 3.5 },
        { label: 'B- (3.00)', value: 3.0 },
        { label: 'C+ (2.50)', value: 2.5 },
        { label: 'C (2.00)', value: 2.0 },
        { label: 'D (1.00)', value: 1.0 },
        { label: 'F (0.00)', value: 0.0 }
      ]
    },
    '10': {
      max: 10.0,
      name: '10.00 Scale',
      grades: [
        { label: 'O / Outstanding (10.0)', value: 10.0 },
        { label: 'A+ / Excellent (9.0)', value: 9.0 },
        { label: 'A / Very Good (8.0)', value: 8.0 },
        { label: 'B+ / Good (7.0)', value: 7.0 },
        { label: 'B / Above Average (6.0)', value: 6.0 },
        { label: 'C / Average (5.0)', value: 5.0 },
        { label: 'P / Pass (4.0)', value: 4.0 },
        { label: 'F / Fail (0.0)', value: 0.0 }
      ]
    }
  };

  // Sample course data for first-time or demo exploration
  const SAMPLE_COURSES = [
    { name: 'Data Structures & Algorithms', credits: 4, grade: 4.0 },
    { name: 'Database Management Systems', credits: 3, grade: 3.7 },
    { name: 'Linear Algebra & Matrices', credits: 3, grade: 3.3 },
    { name: 'Technical Communication', credits: 2, grade: 4.0 }
  ];

  // ==========================================================================
  // 2. State Management
  // ==========================================================================
  const state = {
    scaleKey: '4',
    customScaleMax: 12.0,
    gradeInputMode: 'letter', // 'letter' | 'numeric'
    includePriorCgpa: true,
    currentCgpa: 3.50,
    creditsCompleted: 45,
    courses: [
      { id: 1, name: 'Computer Architecture', credits: 3, grade: 4.0 },
      { id: 2, name: 'Operating Systems', credits: 3, grade: 3.7 },
      { id: 3, name: 'Calculus III', credits: 3, grade: 3.3 }
    ],
    nextCourseId: 4
  };

  // ==========================================================================
  // 3. DOM Elements Cache
  // ==========================================================================
  const DOM = {
    body: document.body,
    themeToggle: document.getElementById('themeToggle'),
    sampleDataBtn: document.getElementById('sampleDataBtn'),
    toastContainer: document.getElementById('toastContainer'),

    // Nav Tabs
    tabButtons: document.querySelectorAll('.nav-tab'),
    tabPanels: document.querySelectorAll('.tab-panel'),

    // Setup Card Controls
    cgpaScaleSelect: document.getElementById('cgpaScale'),
    customScaleWrapper: document.getElementById('customScaleWrapper'),
    customScaleInput: document.getElementById('customScale'),
    modeLetterBtn: document.getElementById('modeLetter'),
    modeNumericBtn: document.getElementById('modeNumeric'),
    includePriorCgpaCheckbox: document.getElementById('includePriorCgpa'),
    priorCgpaFields: document.getElementById('priorCgpaFields'),
    priorModeBadge: document.getElementById('priorModeBadge'),
    currentCgpaInput: document.getElementById('currentCgpa'),
    scaleAdornment: document.getElementById('scaleAdornment'),
    creditsCompletedInput: document.getElementById('creditsCompleted'),
    currentCgpaError: document.getElementById('currentCgpaError'),
    creditsCompletedError: document.getElementById('creditsCompletedError'),

    // Courses Card Controls
    coursesContainer: document.getElementById('coursesContainer'),
    addCourseBtn: document.getElementById('addCourseBtn'),
    quickAddThreeBtn: document.getElementById('quickAddThreeBtn'),
    clearCoursesBtn: document.getElementById('clearCoursesBtn'),
    courseCountBadge: document.getElementById('courseCountBadge'),
    totalTermCreditsBadge: document.getElementById('totalTermCreditsBadge'),

    // Results Dashboard
    gaugeProgress: document.getElementById('gaugeProgress'),
    displayCgpa: document.getElementById('displayCgpa'),
    displayMaxScale: document.getElementById('displayMaxScale'),
    resultPrimaryLabel: document.getElementById('resultPrimaryLabel'),
    resultEyebrow: document.getElementById('resultEyebrow'),
    deltaBadge: document.getElementById('deltaBadge'),
    deltaArrow: document.getElementById('deltaArrow'),
    deltaValue: document.getElementById('deltaValue'),
    honorsBadge: document.getElementById('honorsBadge'),
    metricSemesterGpa: document.getElementById('metricSemesterGpa'),
    metricSemesterCredits: document.getElementById('metricSemesterCredits'),
    metricTotalCredits: document.getElementById('metricTotalCredits'),
    metricTotalPoints: document.getElementById('metricTotalPoints'),
    copySummaryBtn: document.getElementById('copySummaryBtn'),
    printReportBtn: document.getElementById('printReportBtn'),
    resetAllBtn: document.getElementById('resetAllBtn'),

    // Forecaster Elements
    targetScale: document.getElementById('targetScale'),
    forecasterCurrentCgpa: document.getElementById('forecasterCurrentCgpa'),
    forecasterCompletedCredits: document.getElementById('forecasterCompletedCredits'),
    forecasterTargetCgpa: document.getElementById('forecasterTargetCgpa'),
    forecasterUpcomingCredits: document.getElementById('forecasterUpcomingCredits'),
    targetRequiredGpa: document.getElementById('targetRequiredGpa'),
    targetScaleSub: document.getElementById('targetScaleSub'),
    targetStatusBadge: document.getElementById('targetStatusBadge'),
    targetAnalysisText: document.getElementById('targetAnalysisText'),
    targetMaxPossibleCgpa: document.getElementById('targetMaxPossibleCgpa'),

    // Printable Sheet
    printDate: document.getElementById('printDate'),
    printCgpa: document.getElementById('printCgpa'),
    printSemesterGpa: document.getElementById('printSemesterGpa'),
    printTotalCredits: document.getElementById('printTotalCredits'),
    printStanding: document.getElementById('printStanding'),
    printCourseTableBody: document.getElementById('printCourseTableBody')
  };

  // SVG Gauge Constant Circumference for r=68
  const GAUGE_CIRCUMFERENCE = 2 * Math.PI * 68; // 427.256

  // ==========================================================================
  // 4. Utility Functions
  // ==========================================================================
  function getMaxScale() {
    if (state.scaleKey === 'custom') {
      const val = parseFloat(state.customScaleMax);
      return !isNaN(val) && val > 0 ? val : 4.0;
    }
    return GRADE_SCALES[state.scaleKey] ? GRADE_SCALES[state.scaleKey].max : 4.0;
  }

  function getGradeOptionsForScale(scaleKey) {
    if (GRADE_SCALES[scaleKey]) {
      return GRADE_SCALES[scaleKey].grades;
    }
    // Fallback for custom scale: generate generic letter grades
    const max = getMaxScale();
    return [
      { label: `A+ (${(max).toFixed(2)})`, value: max },
      { label: `A (${(max * 0.95).toFixed(2)})`, value: max * 0.95 },
      { label: `A- (${(max * 0.90).toFixed(2)})`, value: max * 0.90 },
      { label: `B+ (${(max * 0.85).toFixed(2)})`, value: max * 0.85 },
      { label: `B (${(max * 0.75).toFixed(2)})`, value: max * 0.75 },
      { label: `B- (${(max * 0.70).toFixed(2)})`, value: max * 0.70 },
      { label: `C+ (${(max * 0.65).toFixed(2)})`, value: max * 0.65 },
      { label: `C (${(max * 0.55).toFixed(2)})`, value: max * 0.55 },
      { label: `D (${(max * 0.40).toFixed(2)})`, value: max * 0.40 },
      { label: 'F (0.00)', value: 0.0 }
    ];
  }

  function showToast(message, type = 'info', duration = 3000) {
    if (!DOM.toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.setAttribute('role', 'alert');
    toast.textContent = message;

    DOM.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(12px) scale(0.95)';
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 250);
    }, duration);
  }

  function getAcademicHonors(cgpa, maxScale) {
    const ratio = maxScale > 0 ? cgpa / maxScale : 0;

    if (ratio >= 0.95) {
      return { text: 'Summa Cum Laude / Outstanding', badgeClass: 'honors-purple' };
    }
    if (ratio >= 0.875) {
      return { text: "Magna Cum Laude / Dean's List", badgeClass: 'primary-light' };
    }
    if (ratio >= 0.80) {
      return { text: 'Cum Laude / First Class', badgeClass: 'success' };
    }
    if (ratio >= 0.65) {
      return { text: 'Good Academic Standing', badgeClass: 'info' };
    }
    if (ratio >= 0.50) {
      return { text: 'Satisfactory Standing', badgeClass: 'warning' };
    }
    return { text: 'Academic Warning / Probation', badgeClass: 'danger' };
  }

  // ==========================================================================
  // 5. Theme Controller
  // ==========================================================================
  function initTheme() {
    const savedTheme = localStorage.getItem('cgpa_theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme ? savedTheme : (prefersDark ? 'dark-mode' : 'light-mode');

    setTheme(initialTheme);

    DOM.themeToggle.addEventListener('click', () => {
      const currentTheme = DOM.body.classList.contains('dark-mode') ? 'dark-mode' : 'light-mode';
      const newTheme = currentTheme === 'dark-mode' ? 'light-mode' : 'dark-mode';
      setTheme(newTheme);
      showToast(`Switched to ${newTheme === 'dark-mode' ? 'Dark' : 'Light'} Mode`, 'info', 1800);
    });
  }

  function setTheme(theme) {
    DOM.body.classList.remove('dark-mode', 'light-mode');
    DOM.body.classList.add(theme);
    localStorage.setItem('cgpa_theme', theme);
  }

  // ==========================================================================
  // 6. Navigation Tabs Controller
  // ==========================================================================
  function initNavigation() {
    const tabList = Array.from(DOM.tabButtons);
    tabList.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        const targetPanelId = btn.getAttribute('aria-controls');
        switchTab(targetPanelId, btn);
      });

      // WAI-ARIA tab keyboard navigation
      btn.addEventListener('keydown', (e) => {
        let newIndex = null;
        if (e.key === 'ArrowRight') {
          newIndex = (index + 1) % tabList.length;
        } else if (e.key === 'ArrowLeft') {
          newIndex = (index - 1 + tabList.length) % tabList.length;
        } else if (e.key === 'Home') {
          newIndex = 0;
        } else if (e.key === 'End') {
          newIndex = tabList.length - 1;
        }

        if (newIndex !== null) {
          e.preventDefault();
          tabList[newIndex].focus();
          tabList[newIndex].click();
        }
      });
    });
  }

  function switchTab(panelId, activeBtn) {
    DOM.tabButtons.forEach(btn => {
      btn.classList.remove('active');
      btn.setAttribute('aria-selected', 'false');
      btn.setAttribute('tabindex', '-1');
    });

    DOM.tabPanels.forEach(panel => {
      panel.classList.add('hidden');
      panel.classList.remove('active');
    });

    activeBtn.classList.add('active');
    activeBtn.setAttribute('aria-selected', 'true');
    activeBtn.setAttribute('tabindex', '0');

    const targetPanel = document.getElementById(panelId);
    if (targetPanel) {
      targetPanel.classList.remove('hidden');
      targetPanel.classList.add('active');
    }
  }

  // ==========================================================================
  // 7. Course Rendering & Management
  // ==========================================================================
  function renderCourseRows() {
    DOM.coursesContainer.innerHTML = '';
    const maxScale = getMaxScale();
    const gradeOptions = getGradeOptionsForScale(state.scaleKey);

    state.courses.forEach((course, index) => {
      const row = document.createElement('div');
      row.className = 'course-row';
      row.dataset.courseId = course.id;

      // Quality points for this course
      const qualityPoints = (course.credits * course.grade).toFixed(2);

      let gradeFieldHtml = '';
      if (state.gradeInputMode === 'letter') {
        // Find best matching grade option
        gradeFieldHtml = `
          <select class="form-select course-grade-select" data-id="${course.id}" aria-label="Course ${index + 1} Grade">
            ${gradeOptions.map(opt => `
              <option value="${opt.value}" ${Math.abs(opt.value - course.grade) < 0.01 ? 'selected' : ''}>
                ${opt.label}
              </option>
            `).join('')}
          </select>
        `;
      } else {
        gradeFieldHtml = `
          <input 
            type="number" 
            class="form-input course-grade-input" 
            data-id="${course.id}"
            value="${course.grade.toFixed(2)}" 
            step="0.01" 
            min="0" 
            max="${maxScale}" 
            aria-label="Course ${index + 1} Grade" 
            placeholder="0.00"
          />
        `;
      }

      row.innerHTML = `
        <div class="course-col-name">
          <input 
            type="text" 
            class="form-input course-name-input" 
            data-id="${course.id}"
            value="${escapeHtml(course.name)}" 
            placeholder="Course ${index + 1} Name" 
            aria-label="Course ${index + 1} Name"
          />
        </div>
        <div class="course-col-credits">
          <input 
            type="number" 
            class="form-input course-credits-input" 
            data-id="${course.id}"
            value="${course.credits}" 
            step="0.5" 
            min="0.5" 
            max="30" 
            aria-label="Course ${index + 1} Credits"
          />
        </div>
        <div class="course-col-grade">
          ${gradeFieldHtml}
        </div>
        <div class="course-col-points">
          <span class="points-label">Points</span>
          <span class="points-val course-points-preview" data-id="${course.id}">${qualityPoints}</span>
        </div>
        <button 
          type="button" 
          class="btn-remove-course" 
          data-id="${course.id}"
          title="Remove course" 
          aria-label="Remove Course ${index + 1}"
          ${state.courses.length <= 1 ? 'disabled' : ''}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
        </button>
      `;

      DOM.coursesContainer.appendChild(row);
    });

    bindCourseEvents();
    recalculateAll();
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>'"]/g, tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag));
  }

  function bindCourseEvents() {
    // Course Name input change
    DOM.coursesContainer.querySelectorAll('.course-name-input').forEach(input => {
      input.addEventListener('input', (e) => {
        const id = parseInt(e.target.dataset.id, 10);
        const course = state.courses.find(c => c.id === id);
        if (course) {
          course.name = e.target.value;
          saveState();
        }
      });
    });

    // Course Credits input change
    DOM.coursesContainer.querySelectorAll('.course-credits-input').forEach(input => {
      input.addEventListener('input', (e) => {
        const id = parseInt(e.target.dataset.id, 10);
        const course = state.courses.find(c => c.id === id);
        if (course) {
          const val = parseFloat(e.target.value);
          course.credits = (!isNaN(val) && val >= 0) ? val : 0;
          updateCoursePointsPreview(id);
          recalculateAll();
        }
      });
    });

    // Course Grade select (Letter Mode)
    DOM.coursesContainer.querySelectorAll('.course-grade-select').forEach(select => {
      select.addEventListener('change', (e) => {
        const id = parseInt(e.target.dataset.id, 10);
        const course = state.courses.find(c => c.id === id);
        if (course) {
          course.grade = parseFloat(e.target.value);
          updateCoursePointsPreview(id);
          recalculateAll();
        }
      });
    });

    // Course Grade input (Numeric Mode)
    DOM.coursesContainer.querySelectorAll('.course-grade-input').forEach(input => {
      input.addEventListener('input', (e) => {
        const id = parseInt(e.target.dataset.id, 10);
        const course = state.courses.find(c => c.id === id);
        if (course) {
          const val = parseFloat(e.target.value);
          const maxScale = getMaxScale();
          course.grade = (!isNaN(val) && val >= 0) ? Math.min(val, maxScale) : 0;
          updateCoursePointsPreview(id);
          recalculateAll();
        }
      });
    });

    // Remove Course buttons
    DOM.coursesContainer.querySelectorAll('.btn-remove-course').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(btn.dataset.id, 10);
        removeCourse(id);
      });
    });

    // Keyboard shortcuts for rapid course entry
    DOM.coursesContainer.querySelectorAll('.course-row').forEach((row, index, allRows) => {
      row.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && (e.ctrlKey || e.metaKey || (index === allRows.length - 1 && e.target.classList.contains('course-grade-input')))) {
          e.preventDefault();
          addCourse();
        }
      });
    });
  }

  function updateCoursePointsPreview(courseId) {
    const course = state.courses.find(c => c.id === courseId);
    if (!course) return;

    const preview = DOM.coursesContainer.querySelector(`.course-points-preview[data-id="${courseId}"]`);
    if (preview) {
      preview.textContent = (course.credits * course.grade).toFixed(2);
    }
  }

  function addCourse(customName = null, credits = 3, grade = null) {
    const maxScale = getMaxScale();
    const defaultGrade = grade !== null ? grade : maxScale;
    const name = customName || `Course ${state.courses.length + 1}`;

    state.courses.push({
      id: state.nextCourseId++,
      name: name,
      credits: credits,
      grade: defaultGrade
    });

    renderCourseRows();

    // Focus newly added course row
    const newRow = DOM.coursesContainer.querySelector(`.course-row[data-course-id="${state.nextCourseId - 1}"]`);
    if (newRow) {
      const input = newRow.querySelector('.course-name-input');
      if (input) input.focus();
    }
  }

  function removeCourse(courseId) {
    if (state.courses.length <= 1) {
      showToast('You must have at least one course.', 'warning', 2000);
      return;
    }
    state.courses = state.courses.filter(c => c.id !== courseId);
    renderCourseRows();
  }

  // ==========================================================================
  // 8. Calculation Engine
  // ==========================================================================
  function recalculateAll() {
    const maxScale = getMaxScale();

    // 1. Calculate Term Courses Stats
    let termCredits = 0;
    let termPoints = 0;

    state.courses.forEach(c => {
      const cr = parseFloat(c.credits) || 0;
      const gr = parseFloat(c.grade) || 0;
      termCredits += cr;
      termPoints += cr * gr;
    });

    const semesterGpa = termCredits > 0 ? (termPoints / termCredits) : 0;

    // 2. Cumulative Stats
    let totalCredits = termCredits;
    let totalPoints = termPoints;
    let cumulativeCgpa = semesterGpa;
    let delta = 0;

    const priorActive = state.includePriorCgpa;
    const priorCgpa = parseFloat(state.currentCgpa) || 0;
    const priorCredits = parseFloat(state.creditsCompleted) || 0;

    if (priorActive && priorCredits > 0) {
      const priorPoints = priorCgpa * priorCredits;
      totalCredits = priorCredits + termCredits;
      totalPoints = priorPoints + termPoints;
      cumulativeCgpa = totalCredits > 0 ? (totalPoints / totalCredits) : 0;
      delta = cumulativeCgpa - priorCgpa;
    }

    // 3. Update DOM Displays
    const displayValue = priorActive ? cumulativeCgpa : semesterGpa;

    DOM.displayCgpa.textContent = displayValue.toFixed(2);
    DOM.displayMaxScale.textContent = `/ ${maxScale.toFixed(2)}`;
    DOM.metricSemesterGpa.textContent = semesterGpa.toFixed(2);
    DOM.metricSemesterCredits.textContent = termCredits.toFixed(1);
    DOM.metricTotalCredits.textContent = totalCredits.toFixed(1);
    DOM.metricTotalPoints.textContent = totalPoints.toFixed(1);

    // Update Course Badges in card header
    DOM.courseCountBadge.textContent = `${state.courses.length} Course${state.courses.length === 1 ? '' : 's'}`;
    DOM.totalTermCreditsBadge.textContent = `${termCredits.toFixed(1)} Credits`;

    // Update Primary Label
    if (priorActive) {
      DOM.resultPrimaryLabel.textContent = 'Updated CGPA';
      DOM.resultEyebrow.textContent = 'Cumulative Performance';
    } else {
      DOM.resultPrimaryLabel.textContent = 'Semester GPA';
      DOM.resultEyebrow.textContent = 'Term Performance';
    }

    // Update Circular Gauge SVG
    const ratio = Math.max(0, Math.min(1, displayValue / maxScale));
    const offset = GAUGE_CIRCUMFERENCE * (1 - ratio);
    DOM.gaugeProgress.style.strokeDashoffset = offset;

    // Update Delta Indicator
    if (!priorActive || priorCredits <= 0) {
      DOM.deltaBadge.className = 'badge-delta neutral';
      DOM.deltaArrow.textContent = '•';
      DOM.deltaValue.textContent = 'Term Only';
    } else if (Math.abs(delta) < 0.005) {
      DOM.deltaBadge.className = 'badge-delta neutral';
      DOM.deltaArrow.textContent = '=';
      DOM.deltaValue.textContent = '0.00';
    } else if (delta > 0) {
      DOM.deltaBadge.className = 'badge-delta positive';
      DOM.deltaArrow.textContent = '▲';
      DOM.deltaValue.textContent = `+${delta.toFixed(2)}`;
    } else {
      DOM.deltaBadge.className = 'badge-delta negative';
      DOM.deltaArrow.textContent = '▼';
      DOM.deltaValue.textContent = delta.toFixed(2);
    }

    // Update Honors Standing Badge
    const honors = getAcademicHonors(displayValue, maxScale);
    DOM.honorsBadge.textContent = honors.text;

    // Save state to local storage
    saveState();
  }

  // ==========================================================================
  // 9. Target CGPA Forecaster Engine
  // ==========================================================================
  function recalculateForecaster() {
    const scale = parseFloat(DOM.targetScale.value) || 4.0;
    const currentCgpa = parseFloat(DOM.forecasterCurrentCgpa.value) || 0;
    const completedCredits = parseFloat(DOM.forecasterCompletedCredits.value) || 0;
    const targetCgpa = parseFloat(DOM.forecasterTargetCgpa.value) || 0;
    const upcomingCredits = parseFloat(DOM.forecasterUpcomingCredits.value) || 0;

    DOM.targetScaleSub.textContent = `Across ${upcomingCredits} credits (Scale: ${scale.toFixed(2)})`;

    if (upcomingCredits <= 0 || completedCredits < 0) {
      DOM.targetRequiredGpa.textContent = '--';
      DOM.targetStatusBadge.className = 'target-badge warning';
      DOM.targetStatusBadge.textContent = 'Invalid Credits';
      DOM.targetAnalysisText.textContent = 'Please enter valid completed and upcoming credit amounts.';
      DOM.targetMaxPossibleCgpa.textContent = '--';
      return;
    }

    // Total future credits = completed + upcoming
    const totalCredits = completedCredits + upcomingCredits;
    const currentPoints = currentCgpa * completedCredits;
    const desiredTotalPoints = targetCgpa * totalCredits;
    const neededPoints = desiredTotalPoints - currentPoints;
    const requiredGpa = neededPoints / upcomingCredits;

    // Max possible CGPA if student scores straight maximum grades
    const maxFuturePoints = currentPoints + (scale * upcomingCredits);
    const maxPossibleCgpa = maxFuturePoints / totalCredits;

    DOM.targetMaxPossibleCgpa.textContent = maxPossibleCgpa.toFixed(2);
    DOM.targetRequiredGpa.textContent = requiredGpa.toFixed(2);

    if (targetCgpa <= currentCgpa) {
      DOM.targetStatusBadge.className = 'target-badge success';
      DOM.targetStatusBadge.textContent = 'Already Achieved';
      DOM.targetAnalysisText.innerHTML = `Your target CGPA of <strong>${targetCgpa.toFixed(2)}</strong> is already below or equal to your current CGPA of <strong>${currentCgpa.toFixed(2)}</strong>. Any GPA above ${targetCgpa.toFixed(2)} will maintain or raise your standing.`;
    } else if (requiredGpa > scale) {
      DOM.targetStatusBadge.className = 'target-badge danger';
      DOM.targetStatusBadge.textContent = 'Mathematically Impossible';
      DOM.targetAnalysisText.innerHTML = `To reach <strong>${targetCgpa.toFixed(2)}</strong> over ${upcomingCredits} credits, you would need a GPA of <strong>${requiredGpa.toFixed(2)}</strong>, which exceeds the max scale of <strong>${scale.toFixed(2)}</strong>. Even with straight A's, the highest CGPA you can reach this term is <strong>${maxPossibleCgpa.toFixed(2)}</strong>.`;
    } else if (requiredGpa > (scale * 0.925)) {
      DOM.targetStatusBadge.className = 'target-badge warning';
      DOM.targetStatusBadge.textContent = 'Challenging Goal';
      DOM.targetAnalysisText.innerHTML = `To raise your CGPA to <strong>${targetCgpa.toFixed(2)}</strong>, you will need nearly straight top grades (GPA: <strong>${requiredGpa.toFixed(2)}</strong>) across your upcoming ${upcomingCredits} credits.`;
    } else if (requiredGpa > currentCgpa) {
      DOM.targetStatusBadge.className = 'target-badge info';
      DOM.targetStatusBadge.textContent = 'Achievable with Focus';
      DOM.targetAnalysisText.innerHTML = `You need an average semester GPA of <strong>${requiredGpa.toFixed(2)}</strong> across ${upcomingCredits} credits to elevate your cumulative CGPA to <strong>${targetCgpa.toFixed(2)}</strong>.`;
    } else {
      DOM.targetStatusBadge.className = 'target-badge success';
      DOM.targetStatusBadge.textContent = 'Comfortably Within Reach';
      DOM.targetAnalysisText.innerHTML = `You need an average of <strong>${requiredGpa.toFixed(2)}</strong> across ${upcomingCredits} credits to reach your goal.`;
    }
  }

  // ==========================================================================
  // 10. Form & Setup Handlers
  // ==========================================================================
  function initSetupHandlers() {
    // CGPA Scale Dropdown
    DOM.cgpaScaleSelect.addEventListener('change', () => {
      state.scaleKey = DOM.cgpaScaleSelect.value;

      if (state.scaleKey === 'custom') {
        DOM.customScaleWrapper.classList.remove('hidden');
        DOM.customScaleWrapper.setAttribute('aria-hidden', 'false');
      } else {
        DOM.customScaleWrapper.classList.add('hidden');
        DOM.customScaleWrapper.setAttribute('aria-hidden', 'true');
      }

      updateScaleAdornments();
      renderCourseRows();
      showToast(`Grading scale set to ${getMaxScale().toFixed(2)}`, 'info', 1800);
    });

    // Custom Scale input
    DOM.customScaleInput.addEventListener('input', () => {
      const val = parseFloat(DOM.customScaleInput.value);
      if (!isNaN(val) && val > 0) {
        state.customScaleMax = val;
        updateScaleAdornments();
        recalculateAll();
      }
    });

    // Grade Mode Toggle (Letter vs Numeric)
    DOM.modeLetterBtn.addEventListener('click', () => {
      if (state.gradeInputMode !== 'letter') {
        state.gradeInputMode = 'letter';
        DOM.modeLetterBtn.classList.add('active');
        DOM.modeLetterBtn.setAttribute('aria-checked', 'true');
        DOM.modeNumericBtn.classList.remove('active');
        DOM.modeNumericBtn.setAttribute('aria-checked', 'false');
        renderCourseRows();
      }
    });

    DOM.modeNumericBtn.addEventListener('click', () => {
      if (state.gradeInputMode !== 'numeric') {
        state.gradeInputMode = 'numeric';
        DOM.modeNumericBtn.classList.add('active');
        DOM.modeNumericBtn.setAttribute('aria-checked', 'true');
        DOM.modeLetterBtn.classList.remove('active');
        DOM.modeLetterBtn.setAttribute('aria-checked', 'false');
        renderCourseRows();
      }
    });

    // Include Prior CGPA Toggle Switch
    DOM.includePriorCgpaCheckbox.addEventListener('change', () => {
      state.includePriorCgpa = DOM.includePriorCgpaCheckbox.checked;

      if (state.includePriorCgpa) {
        DOM.priorCgpaFields.classList.remove('hidden');
        DOM.priorModeBadge.textContent = 'Cumulative Mode';
      } else {
        DOM.priorCgpaFields.classList.add('hidden');
        DOM.priorModeBadge.textContent = 'Semester GPA Mode';
      }

      recalculateAll();
    });

    // Current CGPA Input
    DOM.currentCgpaInput.addEventListener('input', () => {
      const val = parseFloat(DOM.currentCgpaInput.value);
      const maxScale = getMaxScale();

      if (isNaN(val) || val < 0) {
        DOM.currentCgpaError.textContent = 'Please enter a valid positive number.';
      } else if (val > maxScale) {
        DOM.currentCgpaError.textContent = `CGPA cannot exceed the maximum scale of ${maxScale.toFixed(2)}.`;
      } else {
        DOM.currentCgpaError.textContent = '';
        state.currentCgpa = val;
      }
      recalculateAll();
    });

    // Completed Credits Input
    DOM.creditsCompletedInput.addEventListener('input', () => {
      const val = parseFloat(DOM.creditsCompletedInput.value);

      if (isNaN(val) || val < 0) {
        DOM.creditsCompletedError.textContent = 'Please enter a valid credit amount.';
      } else {
        DOM.creditsCompletedError.textContent = '';
        state.creditsCompleted = val;
      }
      recalculateAll();
    });

    // Course management action buttons
    DOM.addCourseBtn.addEventListener('click', () => {
      addCourse();
      showToast('Course added', 'info', 1200);
    });

    DOM.quickAddThreeBtn.addEventListener('click', () => {
      addCourse(null, 3);
      addCourse(null, 3);
      addCourse(null, 3);
      showToast('Added 3 new courses', 'info', 1800);
    });

    DOM.clearCoursesBtn.addEventListener('click', () => {
      if (confirm('Clear all course details?')) {
        state.courses = [
          { id: state.nextCourseId++, name: 'Course 1', credits: 3, grade: getMaxScale() }
        ];
        renderCourseRows();
        showToast('Courses cleared', 'info', 1800);
      }
    });

    // Sample Data button in header
    DOM.sampleDataBtn.addEventListener('click', () => {
      loadSampleData();
      showToast('Realistic sample courses loaded!', 'success', 2200);
    });

    // Reset All button
    DOM.resetAllBtn.addEventListener('click', () => {
      if (confirm('Reset entire calculator to defaults?')) {
        localStorage.removeItem('cgpa_calculator_state');
        state.scaleKey = '4';
        state.gradeInputMode = 'letter';
        state.includePriorCgpa = true;
        state.currentCgpa = 3.50;
        state.creditsCompleted = 45;
        state.courses = [
          { id: 1, name: 'Computer Architecture', credits: 3, grade: 4.0 },
          { id: 2, name: 'Operating Systems', credits: 3, grade: 3.7 },
          { id: 3, name: 'Calculus III', credits: 3, grade: 3.3 }
        ];
        state.nextCourseId = 4;

        DOM.cgpaScaleSelect.value = '4';
        DOM.customScaleWrapper.classList.add('hidden');
        DOM.modeLetterBtn.classList.add('active');
        DOM.modeNumericBtn.classList.remove('active');
        DOM.includePriorCgpaCheckbox.checked = true;
        DOM.priorCgpaFields.classList.remove('hidden');
        DOM.currentCgpaInput.value = '3.50';
        DOM.creditsCompletedInput.value = '45';

        updateScaleAdornments();
        renderCourseRows();
        showToast('Calculator reset to defaults.', 'info', 1800);
      }
    });

    // Copy Summary Button
    DOM.copySummaryBtn.addEventListener('click', copySummaryToClipboard);

    // Print Report Button
    DOM.printReportBtn.addEventListener('click', printAcademicReport);

    // Forecaster Inputs
    [
      DOM.targetScale,
      DOM.forecasterCurrentCgpa,
      DOM.forecasterCompletedCredits,
      DOM.forecasterTargetCgpa,
      DOM.forecasterUpcomingCredits
    ].forEach(el => {
      if (el) el.addEventListener('input', recalculateForecaster);
    });
  }

  function updateScaleAdornments() {
    const max = getMaxScale();
    DOM.scaleAdornment.textContent = `/ ${max.toFixed(2)}`;
    DOM.currentCgpaInput.max = max;
  }

  // ==========================================================================
  // 11. Sample Data & State Persistence
  // ==========================================================================
  function loadSampleData() {
    state.scaleKey = '4';
    state.gradeInputMode = 'letter';
    state.includePriorCgpa = true;
    state.currentCgpa = 3.65;
    state.creditsCompleted = 60;
    state.courses = SAMPLE_COURSES.map((c, i) => ({
      id: state.nextCourseId++,
      name: c.name,
      credits: c.credits,
      grade: c.grade
    }));

    DOM.cgpaScaleSelect.value = '4';
    DOM.customScaleWrapper.classList.add('hidden');
    DOM.modeLetterBtn.classList.add('active');
    DOM.modeNumericBtn.classList.remove('active');
    DOM.includePriorCgpaCheckbox.checked = true;
    DOM.priorCgpaFields.classList.remove('hidden');
    DOM.currentCgpaInput.value = '3.65';
    DOM.creditsCompletedInput.value = '60';

    updateScaleAdornments();
    renderCourseRows();
  }

  function saveState() {
    try {
      const data = {
        scaleKey: state.scaleKey,
        customScaleMax: state.customScaleMax,
        gradeInputMode: state.gradeInputMode,
        includePriorCgpa: state.includePriorCgpa,
        currentCgpa: state.currentCgpa,
        creditsCompleted: state.creditsCompleted,
        courses: state.courses
      };
      localStorage.setItem('cgpa_calculator_state', JSON.stringify(data));
    } catch (e) {
      // Storage might fail in sandboxed iframes or private modes
    }
  }

  function restoreState() {
    try {
      const raw = localStorage.getItem('cgpa_calculator_state');
      if (!raw) return false;
      const data = JSON.parse(raw);

      if (data && Array.isArray(data.courses) && data.courses.length > 0) {
        state.scaleKey = data.scaleKey || '4';
        state.customScaleMax = data.customScaleMax || 12.0;
        state.gradeInputMode = data.gradeInputMode || 'letter';
        state.includePriorCgpa = data.includePriorCgpa !== undefined ? data.includePriorCgpa : true;
        state.currentCgpa = data.currentCgpa !== undefined ? data.currentCgpa : 3.50;
        state.creditsCompleted = data.creditsCompleted !== undefined ? data.creditsCompleted : 45;
        state.courses = data.courses;
        state.nextCourseId = Math.max(...data.courses.map(c => c.id || 0)) + 1;

        // Sync inputs
        DOM.cgpaScaleSelect.value = state.scaleKey;
        if (state.scaleKey === 'custom') {
          DOM.customScaleWrapper.classList.remove('hidden');
          DOM.customScaleInput.value = state.customScaleMax;
        }

        if (state.gradeInputMode === 'numeric') {
          DOM.modeNumericBtn.classList.add('active');
          DOM.modeLetterBtn.classList.remove('active');
        } else {
          DOM.modeLetterBtn.classList.add('active');
          DOM.modeNumericBtn.classList.remove('active');
        }

        DOM.includePriorCgpaCheckbox.checked = state.includePriorCgpa;
        if (!state.includePriorCgpa) {
          DOM.priorCgpaFields.classList.add('hidden');
          DOM.priorModeBadge.textContent = 'Semester GPA Mode';
        }

        DOM.currentCgpaInput.value = state.currentCgpa;
        DOM.creditsCompletedInput.value = state.creditsCompleted;

        updateScaleAdornments();
        return true;
      }
    } catch (e) {
      console.warn('Could not restore state from localStorage', e);
    }
    return false;
  }

  // ==========================================================================
  // 12. Actions: Copy Summary & Print Report
  // ==========================================================================
  function copySummaryToClipboard() {
    const maxScale = getMaxScale();
    const cgpa = DOM.displayCgpa.textContent;
    const semGpa = DOM.metricSemesterGpa.textContent;
    const semCredits = DOM.metricSemesterCredits.textContent;
    const totalCredits = DOM.metricTotalCredits.textContent;
    const standing = DOM.honorsBadge.textContent;
    const delta = DOM.deltaValue.textContent;

    let text = `====================================\n`;
    text += `🎓 ACADEMIC CGPA PROJECTION REPORT\n`;
    text += `====================================\n`;
    text += `Scale: ${maxScale.toFixed(2)}\n`;
    if (state.includePriorCgpa) {
      text += `Updated Cumulative CGPA: ${cgpa} (${delta})\n`;
      text += `Previous CGPA: ${state.currentCgpa} (${state.creditsCompleted} credits)\n`;
    }
    text += `Semester GPA: ${semGpa} (${semCredits} credits)\n`;
    text += `Total Credits Completed: ${totalCredits}\n`;
    text += `Academic Standing: ${standing}\n\n`;
    text += `Course Breakdown:\n`;

    state.courses.forEach((c, i) => {
      text += `  • ${c.name || `Course ${i + 1}`}: ${c.credits} credits | Grade: ${c.grade.toFixed(2)} | Points: ${(c.credits * c.grade).toFixed(2)}\n`;
    });

    text += `\nCalculated via CGPA Calculator: https://mohiuddin-khan-shiam.github.io/CGPA-Calculator/\n`;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text)
        .then(() => showToast('Summary copied to clipboard!', 'success', 2500))
        .catch(() => fallbackCopy(text));
    } else {
      fallbackCopy(text);
    }
  }

  function fallbackCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      showToast('Summary copied to clipboard!', 'success', 2500);
    } catch (e) {
      showToast('Could not copy to clipboard.', 'danger', 2500);
    }
    document.body.removeChild(textarea);
  }

  function printAcademicReport() {
    // Populate printable sheet
    const now = new Date();
    DOM.printDate.textContent = `Generated on ${now.toLocaleDateString()} at ${now.toLocaleTimeString()}`;
    DOM.printCgpa.textContent = `${DOM.displayCgpa.textContent} / ${getMaxScale().toFixed(2)}`;
    DOM.printSemesterGpa.textContent = DOM.metricSemesterGpa.textContent;
    DOM.printTotalCredits.textContent = DOM.metricTotalCredits.textContent;
    DOM.printStanding.textContent = DOM.honorsBadge.textContent;

    DOM.printCourseTableBody.innerHTML = '';
    state.courses.forEach((c, i) => {
      const row = document.createElement('tr');
      const pts = (c.credits * c.grade).toFixed(2);
      row.innerHTML = `
        <td>${escapeHtml(c.name || `Course ${i + 1}`)}</td>
        <td>${c.credits}</td>
        <td>${c.grade.toFixed(2)}</td>
        <td>${c.grade.toFixed(2)}</td>
        <td>${pts}</td>
      `;
      DOM.printCourseTableBody.appendChild(row);
    });

    window.print();
  }

  // ==========================================================================
  // 13. App Initialization
  // ==========================================================================
  function init() {
    initTheme();
    initNavigation();
    initSetupHandlers();

    // Restore prior state if user refreshed or previously visited
    const restored = restoreState();
    if (!restored) {
      updateScaleAdornments();
    }

    renderCourseRows();
    recalculateForecaster();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
