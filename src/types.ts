export enum Gender {
    FEMALE = "Female",
    MALE = "Male",
    GENDERLESS = "Genderless",
    UNKNOWN = "Unknown",
}

export enum Status {
    ALIVE = "Alive",
    DEAD = "Dead",
    UNKNOWN = "Unknown",
}

export enum Species {
    HUMANOID = "Humanoid",
    ALIEN = "Alien",
    MYTHOLOGICAL_CREATURE = "Mythological Creature",
    HUMAN = "Human",
}

export interface DropdownOption {
    value: string;
    label: string;
}

export interface Card {
    name: string;
    gender: Gender;
    status: Status;
    species: Species;
    image: string;
}

export interface Person {
    created: string;
    episode: string[];
    gender: Gender;
    id: number;
    image: string;
    location: Location;
    name: string;
    origin: Origin;
    species: Species;
    status: Status;
    type: string;
    url: string;
}

interface Location {
    name: string;
    url: string;
}

interface Origin {
    name: string;
    url: string;
}
