
export interface Person {
    name: string;
    lastname: string;
    skills: Skill[];
    company: Company;
}

export interface Skill {
    name: string;
    level: number;
}

export interface Company {
    name: string;
}
