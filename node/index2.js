const techs = [
    'ReactJS',
    'NodeJS',
    'C puro raiz',
    'java'
];

// Tornar em UpperCase todas as techs cujo o nome contenha mais de 5 caracteres

const atualizadaTechs = techs.map(tech => (tech.length > 5) ? tech.toUpperCase() : ''); // As duas estão corretas
// const atualizadaTech = techs.filter(tech => tech.length > 5).map(tech.toUpperCase());

console.table(atualizadaTechs);