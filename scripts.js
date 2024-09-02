// Initialize default warehouse and pallet data
const defaultWarehouses = [
    { id: 1, location: 'Chennai', capacity: '100 tons', owner: 'Varun', contact: 'varun12@gmail.com', phone: '9988574561' },
    { id: 2, location: 'Pollachi', capacity: '200 tons', owner: 'Abinesh', contact: 'abinesh34@email.com', phone: '9876543210' },
    { id: 3, location: 'Chengalpattu', capacity: '150 tons', owner: 'Sonapathy', contact: 'Sonapathy673@gmail.com', phone: '8759345632' }
];

const defaultPallets = [
    { description: 'Wooden Pallet with minor damage', price: '50 USD', photo:  'PNG/Minor_damage.png' },
    { description: 'Plastic Pallet with cracks', price: '30 USD', photo: 'PNG/Plastic.png' },
    { description: 'Metal Pallet with scratches', price: '80 USD', photo: 'PNG/steel.png' }
];

// Load default data if not already in localStorage
function initializeData() {
    if (!localStorage.getItem('warehouses')) {
        localStorage.setItem('warehouses', JSON.stringify(defaultWarehouses));
    }

    if (!localStorage.getItem('palletsForSale')) {
        localStorage.setItem('palletsForSale', JSON.stringify(defaultPallets));
    }
}

// Fetch data from localStorage
function fetchData() {
    return {
        warehouses: JSON.parse(localStorage.getItem('warehouses')) || [],
        palletsForSale: JSON.parse(localStorage.getItem('palletsForSale')) || []
    };
}

// Update warehouse details
function updateWarehouse() {
    const location = document.getElementById('location').value;
    const capacity = document.getElementById('capacity').value;
    const owner = document.getElementById('owner').value;
    const contact = document.getElementById('contact').value;
    const phone = document.getElementById('phone').value;

    const newWarehouse = { location, capacity, owner, contact, phone };
    const data = fetchData();
    data.warehouses.push(newWarehouse);
    localStorage.setItem('warehouses', JSON.stringify(data.warehouses));

    alert('Warehouse details updated successfully!');
    displayWarehouses();
}

// Display warehouses on the farmer page
function displayWarehouses() {
    const data = fetchData();
    const warehouseList = document.getElementById('warehouseList');
    warehouseList.innerHTML = '';

    data.warehouses.forEach((warehouse) => {
        const warehouseCard = document.createElement('div');
        warehouseCard.className = 'warehouse-card col-md-4';
        warehouseCard.innerHTML = `
            <h4>${warehouse.location}</h4>
            <p>Capacity: ${warehouse.capacity}</p>
            <p>Owner: ${warehouse.owner}</p>
            <p>Contact: ${warehouse.contact}</p>
            <p>Phone: ${warehouse.phone}</p>
        `;
        warehouseList.appendChild(warehouseCard);
    });
}

// Add a pallet for sale
function addPalletForSale() {
    const description = document.getElementById('palletDescription').value;
    const price = document.getElementById('palletPrice').value;
    const photoInput = document.getElementById('palletPhoto');
    const photo = URL.createObjectURL(photoInput.files[0]);

    const newPallet = { description, price, photo };
    const data = fetchData();
    data.palletsForSale.push(newPallet);
    localStorage.setItem('palletsForSale', JSON.stringify(data.palletsForSale));

    alert('Pallet added for sale successfully!');
    displayPalletsForSale();
}

// Display pallets for sale on the farmer page
function displayPalletsForSale() {
    const data = fetchData();
    const palletsForSaleContainer = document.getElementById('availablePallets');
    palletsForSaleContainer.innerHTML = '';

    data.palletsForSale.forEach((pallet) => {
        const palletCard = document.createElement('div');
        palletCard.className = 'pallet-card col-md-4';
        palletCard.innerHTML = `
            <img src="${pallet.photo}" alt="Pallet Photo">
            <h4>${pallet.description}</h4>
            <p>Price: ${pallet.price}</p>
        `;
        palletsForSaleContainer.appendChild(palletCard);
    });
}

// Initialize data and display on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeData();

    if (document.getElementById('warehouseList')) {
        displayWarehouses();
    }

    if (document.getElementById('availablePallets')) {
        displayPalletsForSale();
    }
});
