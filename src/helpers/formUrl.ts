export const formPersonsUrl = (
    species: string,
    status: string,
    name: string,
    gender: string,
    page: number = 1
) => {
    const url = "https://rickandmortyapi.com/api/character/?";
    const speciesPart = species ? `&species=${species}` : "";
    const statusPart = status ? `&status=${status}` : "";
    const namePart = name ? `&name=${name}` : "";
    const genderPart = gender ? `&gender=${gender}` : "";
    return `${url}page=${page}${speciesPart}${statusPart}${namePart}${namePart}${genderPart}`;
};
