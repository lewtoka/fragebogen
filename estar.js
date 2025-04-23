// kann man wenn man den letzten Aufruf kennt, alles sofort beenden?

async function bruteForceCheckboxAnswers() {
    const checkboxes = document.querySelectorAll('.inputCheckbox');
    const total = checkboxes.length;
    const form = document.getElementById('fragebogenForm');

    // Helper to get the text of selected checkboxes
    const getSelectedTexts = () => {
        return Array.from(checkboxes)
            .filter(cb => cb.checked)
            .map(cb => document.querySelector(`label[for="${cb.id}"]`).innerText.trim());
    };

    // Generate all combinations of checkbox selections (excluding empty set)
    const combinations = (n) => {
        const results = [];
        const max = 1 << n; // 2^n

        for (let i = 1; i < max; i++) { // skip i=0 (no boxes selected)
            const combo = [];
            for (let j = 0; j < n; j++) {
                if (i & (1 << j)) combo.push(j);
            }
            results.push(combo);
        }
        return results;
    };

    const combos = combinations(total);

    for (const combo of combos) {
        // Uncheck all first
        checkboxes.forEach(cb => cb.checked = false);

        // Check only the current combo
        combo.forEach(index => checkboxes[index].checked = true);

        const qUrl = $('#fragebogenForm').attr('action') + '&checkByAjax=1';
        const datastring = $("#fragebogenForm").serialize();

        try {
            const data = await $.ajax({
                type: "POST",
                url: qUrl,
                async: true,
                data: datastring,
            });

            const result = JSON.parse(data);

            if (result.questionCheck !== 'failed') {
                console.log("✅ Correct combination found:");
                console.log(getSelectedTexts());
                return; // Stop at first correct combo
            } else {
                console.log("❌ Incorrect:", getSelectedTexts());
            }
        } catch (err) {
            console.error("Error during request:", err);
        }
    }

    console.log("🔍 Finished checking all combinations.");
}
bruteForceCheckboxAnswers();
