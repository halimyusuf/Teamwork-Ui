const jobroles = [{
        id: 1,
        name: "Accounting manager"
    },
    {
        id: 2,
        name: "Senior developer"
    },
    {
        id: 3,
        name: "Strategy manager"
    },
    {
        id: 4,
        name: "General manager"
    },
    {
        id: 5,
        name: "Event manager"
    },
    {
        id: 6,
        name: "Program Coordinator"
    },
    {
        id: 7,
        name: "Legal counselor"
    },
    {
        id: 8,
        name: "Android developer"
    },
    {
        id: 9,
        name: "IOS protection officer"
    }
]



const departments = [{
        id: 1,
        name: "Human Resources"
    },
    {
        id: 2,
        name: "Information technology"
    },
    {
        id: 3,
        name: "Accounting"
    },
    {
        id: 4,
        name: "Marketing"
    },
    {
        id: 5,
        name: "Customer Services"
    },
    {
        id: 6,
        name: "Operations"
    },
    {
        id: 7,
        name: "Production"
    },
    {
        id: 8,
        name: "Finance"
    }
]

const gender = [{
        id: 1,
        name: "Male"
    },
    {
        id: 2,
        name: "Female"
    }
]



export function getJobroles() {
    return jobroles
}

export function getDepartments() {
    return departments
}

export function getGender() {
    return gender
}