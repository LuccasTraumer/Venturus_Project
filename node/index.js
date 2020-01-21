const listaDeUsuarios = [
    {
        login: 'traumer',
        password: '123',
        name: 'Lucas',
        age: 20
    },
    {
        login: 'layla',
        password: '123',
        name: 'Layla',
        age: 25
    },
    {
        login: 'marcus',
        password: '123',
        name: 'Marcus',
        age: 27
    }
];

const maisVelhos = listaDeUsuarios.filter(el => el.age >= 25) // Filtra
//console.log(maisVelhos);
const found = listaDeUsuarios.find(user => user.login === 'traumer' && user.password === '123') // Encontra o primeiro
//console.log(found);

const novoUsusarios = listaDeUsuarios.map(obj => {
    return {...obj,name: obj.name.toUpperCase()}
});
//console.log(novoUsusarios);

const listaDeSalarios = [
    1000,2000,3000,4000,5000
];

// Aplicar uma funcção de reajuste de 3% em todos os salarios

const novosSalarios = listaDeSalarios.map((salario) => salario + salario * 0.03)

//console.table(novosSalarios);
