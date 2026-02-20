// ==============================
// 1️⃣ MULTIPLIER FUNCTION
// ==============================

function multiplyAll(...numbers) {
    if (numbers.length === 0) return 0;

    return numbers.reduce((acc, current) => acc * current, 1);
}

// Handle input from UI
function handleMultiply() {
    const input = document.getElementById("numbersInput").value;

    if (!input) {
        document.getElementById("multiplyResult").innerText =
            "Please enter some numbers.";
        return;
    }

    // Convert string to array of numbers
    const numbersArray = input
        .split(",")
        .map(num => Number(num.trim()))
        .filter(num => !isNaN(num));

    if (numbersArray.length === 0) {
        document.getElementById("multiplyResult").innerText =
            "Invalid input.";
        return;
    }

    const result = multiplyAll(...numbersArray);

    document.getElementById("multiplyResult").innerText =
        "Result: " + result;
}



// ==============================
// 2️⃣ FETCH API + VISUALIZATION
// ==============================

async function loadAndVisualize() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await response.json();

        // Transform data:
        // Use latitude values from address.geo.lat
        const transformed = data.map(user => ({
            x: user.name,
            y: Number(user.address.geo.lat)
        }));

        // Open TensorFlow Visor
        const surface = tfvis.visor().surface({
            name: "Users Latitude",
            tab: "Line Chart"
        });

        // Render line chart
        tfvis.render.linechart(
            surface,
            { values: transformed },
            {
                xLabel: "User",
                yLabel: "Latitude",
                height: 400
            }
        );

    } catch (error) {
        console.error("Error fetching data:", error);
    }
}