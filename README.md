# CGPA Calculator & Academic Planner

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-success.svg)](https://mohiuddin-khan-shiam.github.io/CGPA-Calculator/)
[![GitHub Repo](https://img.shields.io/badge/GitHub-mohiuddin--khan--shiam/CGPA--Calculator-blue.svg)](https://github.com/mohiuddin-khan-shiam/CGPA-Calculator)
[![Pure Vanilla](https://img.shields.io/badge/Stack-HTML5%20%7C%20CSS3%20%7C%20ES6%2B-orange.svg)](#technology-stack)
[![Privacy First](https://img.shields.io/badge/Privacy-100%25%20Client--Side-brightgreen.svg)](#privacy--security)

A modern, fast, and interactive academic GPA and CGPA planner. Calculate your updated Cumulative Grade Point Average, analyze term performance, forecast target graduation goals, and convert letter grades in real time with an intuitive, responsive interface.

---

## 🌟 Key Features

### ⚡ Interactive Calculator
- **Instant Reactive Calculations:** Updates your CGPA, semester GPA, quality points, and change delta dynamically as you type or adjust dropdowns.
- **Dynamic Course Manager:** Add or remove courses on the fly, quick-add 3 courses at once, or load realistic sample courses with a single click.
- **Letter Grade & Numeric Modes:** Seamlessly toggle between standard letter grades (A+, A, A-, B+...) and direct decimal GPA numbers (e.g., `3.75`).
- **Cumulative vs. Semester GPA Mode:** Check or uncheck *"Include Previous Academic Record"* to switch effortlessly between calculating a fresh semester GPA or updating your cumulative CGPA.
- **Visual Circular Progress Gauge:** Animated SVG gauge with a smooth gradient ring visually displaying your CGPA against the maximum scale.
- **Academic Standing & Honors Badges:** Automatically classifies your performance (*Summa Cum Laude / Dean's List*, *Magna Cum Laude*, *Cum Laude*, *Good Standing*, etc.).
- **Performance Delta Indicator:** Visual indicator displaying exact changes from your prior CGPA (`▲ +0.12`, `▼ -0.05`, or `= 0.00`).

### 🎯 Target CGPA Forecaster
- **Goal Forecasting Engine:** Determines the exact semester or future GPA required across remaining credits to reach your desired target graduation CGPA.
- **Feasibility Assessment:** Categorizes target goals as *Already Achieved*, *Comfortably Within Reach*, *Achievable with Focus*, *Challenging Goal*, or *Mathematically Impossible*.
- **Maximum Possible CGPA:** Automatically calculates the highest achievable CGPA if you earn straight top grades in all remaining credit hours.

### 📐 Multi-Scale & Grading Reference
- **Preset & Custom Scales:**
  - Standard 4.00 Scale (US & International)
  - 4.33 Scale (e.g., SFU, Dalhousie)
  - 5.00 Scale (e.g., MIT, Singapore, Nigeria)
  - 10.00 Scale (e.g., IIT, India)
  - Custom Scale (1.00 to 100.00)
- **Grading Scale Reference Table:** Benchmark conversion chart for letter grades, grade points, percentage equivalents, and academic distinctions.
- **Interactive Formula Guide & FAQ:** Clear explanations of official credit-weighted quality point formulas with step-by-step examples.

### 🖨️ Export, Print & Sharing
- **Copy Summary to Clipboard:** Generates a formatted text summary ready to share with academic advisors, mentors, or friends.
- **Print / PDF Report Generator:** Dedicated `@media print` layout converts your course list, term metrics, and cumulative projection into a clean academic report sheet.
- **Local Persistence:** Automatically preserves your course data and settings in browser `localStorage` so you never lose your inputs if you refresh.

### 🎨 Design & Accessibility
- **Modern Theme System:** High-contrast Dark and Light themes with automatic `prefers-color-scheme` detection and smooth transitions.
- **Glassmorphism & Fluid Typography:** Powered by Google's *Plus Jakarta Sans*, sleek borders, and subtle drop shadows.
- **Keyboard Navigation:** Full WAI-ARIA tab navigation (`ArrowLeft`, `ArrowRight`, `Home`, `End`), accessible focus indicators, and keyboard shortcuts (`Ctrl+Enter` to quickly add courses).

---

## 🚀 Live Demo

Try the live application hosted directly on GitHub Pages:  
👉 **[https://mohiuddin-khan-shiam.github.io/CGPA-Calculator/](https://mohiuddin-khan-shiam.github.io/CGPA-Calculator/)**

---

## 🧮 Mathematical Formulas

### 1. Semester GPA (Grade Point Average)
$$\text{Semester GPA} = \frac{\sum_{i=1}^{n} (\text{Credit}_i \times \text{Grade}_i)}{\sum_{i=1}^{n} \text{Credit}_i}$$

### 2. Updated Cumulative CGPA
$$\text{Updated CGPA} = \frac{(\text{Prior CGPA} \times \text{Prior Credits}) + \sum_{i=1}^{n} (\text{Credit}_i \times \text{Grade}_i)}{\text{Prior Credits} + \sum_{i=1}^{n} \text{Credit}_i}$$

### 3. Required Future GPA for Target CGPA
$$\text{Required GPA} = \frac{\text{Target CGPA} \times (\text{Prior Credits} + \text{Remaining Credits}) - (\text{Prior CGPA} \times \text{Prior Credits})}{\text{Remaining Credits}}$$

$$\text{Max Possible CGPA} = \frac{(\text{Prior CGPA} \times \text{Prior Credits}) + (\text{Max Scale} \times \text{Remaining Credits})}{\text{Prior Credits} + \text{Remaining Credits}}$$

---

## 💻 Technology Stack

- **HTML5:** Semantic markup, WAI-ARIA accessibility roles, micro-interactions.
- **CSS3:** Custom properties (design tokens), CSS Grid, Flexbox, glassmorphic backdrop filters, fluid typography, `@media print` stylesheet.
- **JavaScript (ES6+):** Vanilla client-side script with zero runtime dependencies or build steps.
- **Icons & Visuals:** Pure inline SVGs for zero layout shift, crisp rendering, and offline compatibility.

---

## 📁 Repository Structure

```
CGPA-Calculator/
├── index.html         # Semantic HTML5 single-page application structure
├── style.css          # Modern CSS3 stylesheet with light/dark theme variables
├── script.js          # Reactive calculation engine, state manager & events
├── favicon.ico        # Website icon
├── dark-mode.png      # Application screenshot (Dark theme)
├── light-mode.png     # Application screenshot (Light theme)
├── LICENSE            # MIT License
└── README.md          # Project documentation
```

---

## 🛠️ Local Installation & Development

No Node.js, package manager, or build steps are required.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mohiuddin-khan-shiam/CGPA-Calculator.git
   cd CGPA-Calculator
   ```

2. **Open in browser:**
   - Double-click `index.html` to open it directly in any browser.
   - Alternatively, serve with VS Code's *Live Server* or any lightweight static server:
     ```bash
     npx serve .
     # or
     python -m http.server 8000
     ```

---

## 🔒 Privacy & Security

This application runs **100% locally in your browser**:
- No transcripts, course names, or grades are sent to any server or third party.
- No analytics trackers or external cookies.
- All stored state stays strictly within your browser's private `localStorage`.

---

## 🤝 Contributing

Contributions, feature ideas, and pull requests are welcome!
1. Fork the project.
2. Create your feature branch (`git checkout -b feature/NewFeature`).
3. Commit your changes (`git commit -m "Add some NewFeature"`).
4. Push to the branch (`git push origin feature/NewFeature`).
5. Open a Pull Request.

---

## 📄 License

This project is open-source and licensed under the [MIT License](LICENSE).

---

## 👤 Author

Created and maintained by **S. M. Mohiuddin Khan Shiam**.

- **Portfolio:** [mohiuddin-khan-shiam.github.io](https://mohiuddin-khan-shiam.github.io/)
- **LinkedIn:** [linkedin.com/in/s-m-mohiuddin-khan-shiam](https://www.linkedin.com/in/s-m-mohiuddin-khan-shiam/)
- **GitHub:** [@mohiuddin-khan-shiam](https://github.com/mohiuddin-khan-shiam)
