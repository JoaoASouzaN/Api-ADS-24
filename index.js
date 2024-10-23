const express = require('express');
const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

let builds = [
    { id: 1, nome: 'Build Sniper', equipamentos: ['Colete balístico', 'Luvas reforçadas'], armas: ['Rifle de precisão', 'Pistola'], modificacoes: ['Mira telescópica', 'Estabilizador de recuo'] },
    { id: 2, nome: 'Build Assalto', equipamentos: ['Colete tático', 'Capacete reforçado'], armas: ['Fuzil de assalto', 'Escopeta'], modificacoes: ['Mira holográfica', 'Carregador estendido'] },
    { id: 3, nome: 'Build Tank', equipamentos: ['Escudo balístico', 'Colete à prova de balas'], armas: ['Escopeta', 'SMG'], modificacoes: ['Blindagem reforçada', 'Redução de recuo'] }
  ];
  
  // GET all builds
  app.get('/builds', (req, res) => {
    res.json(builds);
  });
  
  // GET build by ID
  app.get('/builds/:id', (req, res) => {
    const build = builds.find(b => b.id === parseInt(req.params.id));
    if (!build) return res.status(404).send('Build not found');
    res.json(build);
  });

  // GET builds por nome (busca com query params)
app.get('/builds/search', (req, res) => {
    const { nome } = req.query;
    if (!nome) {
      return res.status(400).send('É necessário fornecer um nome para a busca.');
    }
  
    const resultados = builds.filter(build =>
      build.nome.toLowerCase().includes(nome.toLowerCase())
    );
  
    if (resultados.length === 0) {
      return res.status(404).send('Nenhum build encontrado com o nome fornecido.');
    }
  
    res.json(resultados);
  });  
  
  // POST nova build
  app.post('/builds', (req, res) => {
    const newBuild = {
      id: builds.length + 1,
      nome: req.body.nome,
      equipamentos: req.body.equipamentos,
      armas: req.body.armas,
      modificacoes: req.body.modificacoes
    };
    builds.push(newBuild);
    res.status(201).json(newBuild);
  });
  
  // PUT update build by ID
  app.put('/builds/:id', (req, res) => {
    const build = builds.find(b => b.id === parseInt(req.params.id));
    if (!build) return res.status(404).send('Build not found');
    build.nome = req.body.nome;
    build.equipamentos = req.body.equipamentos;
    build.armas = req.body.armas;
    build.modificacoes = req.body.modificacoes;
    res.json(build);
  });
  
  // DELETE build by ID
  app.delete('/builds/:id', (req, res) => {
    const buildIndex = builds.findIndex(b => b.id === parseInt(req.params.id));
    if (buildIndex === -1) return res.status(404).send('Build not found');
    builds.splice(buildIndex, 1);
    res.status(204).send();
  });  