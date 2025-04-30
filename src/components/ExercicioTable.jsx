import { useEffect, useState } from "react";

export default function ExercicioTable() {
  const [exercicios, setExercicios] = useState([]);
  const [novoExercicio, setNovoExercicio] = useState({
    nome: "",
    grupoMuscular: "",
    tipo: "",
    diaSemana: "",
    seriesRepeticoes: "",
  });
  const [editandoId, setEditandoId] = useState(null); // Estado para armazenar o ID do exercício em edição
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar o modal
  const [erros, setErros] = useState({}); // Estado para armazenar mensagens de erro

  useEffect(() => {
    const data = localStorage.getItem("exercicios");
    if (data) setExercicios(JSON.parse(data));
  }, []);

  useEffect(() => {
    localStorage.setItem("exercicios", JSON.stringify(exercicios));
  }, [exercicios]);

  const handleChange = (e) => {
    setNovoExercicio({ ...novoExercicio, [e.target.name]: e.target.value });
    setErros({ ...erros, [e.target.name]: "" }); // Limpa o erro ao alterar o campo
  };

  const validarCampos = () => {
    const novosErros = {};
    if (!novoExercicio.nome.trim()) novosErros.nome = "O nome é obrigatório.";
    if (!novoExercicio.grupoMuscular.trim())
      novosErros.grupoMuscular = "O grupo muscular é obrigatório.";
    if (!novoExercicio.tipo.trim()) novosErros.tipo = "O tipo é obrigatório.";
    if (!novoExercicio.diaSemana.trim())
      novosErros.diaSemana = "O dia da semana é obrigatório.";
    if (!novoExercicio.seriesRepeticoes.trim())
      novosErros.seriesRepeticoes = "As séries e repetições são obrigatórias.";
    setErros(novosErros);
    return Object.keys(novosErros).length === 0; // Retorna true se não houver erros
  };

  const adicionarExercicio = (e) => {
    e.preventDefault();
    if (!validarCampos()) return; // Interrompe se houver erros

    if (editandoId) {
      // Salvar alterações no exercício em edição
      setExercicios(
        exercicios.map((ex) =>
          ex.id === editandoId ? { ...novoExercicio, id: editandoId } : ex
        )
      );
      setEditandoId(null); // Sair do modo de edição
    } else {
      // Adicionar novo exercício
      const novo = { ...novoExercicio, id: Date.now() };
      setExercicios([...exercicios, novo]);
    }
    setNovoExercicio({
      nome: "",
      grupoMuscular: "",
      tipo: "",
      diaSemana: "",
      seriesRepeticoes: "",
    });
    setIsModalOpen(false); // Fechar o modal após adicionar ou editar
  };

  const iniciarEdicao = (id) => {
    const exercicio = exercicios.find((ex) => ex.id === id);
    setNovoExercicio(exercicio);
    setEditandoId(id); // Entrar no modo de edição
    setIsModalOpen(true); // Abrir o modal para edição
  };

  const excluirExercicio = (id) => {
    setExercicios(exercicios.filter((e) => e.id !== id));
  };

  return (
    <div className="p-6 max-w-5xl mx-auto text-white">
      <h1 className="md:text-5xl text-center font-bold mb-4 text-2xl">
        Cadastro de Exercícios
      </h1>

      {/* Botão para abrir o modal */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 w-full rounded hover:bg-blue-600 mb-6"
      >
        Adicionar exercicio
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed text-black inset-0 flex items-center justify-center backdrop-blur-sm backdrop-brightness-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              {editandoId ? "Editar Exercício" : "Adicionar Exercício"}
            </h2>
            <form onSubmit={adicionarExercicio}>
              <div className="mb-4">
                <label className="block text-sm text-black font-medium mb-1">
                  Nome
                </label>
                <input
                  type="text"
                  name="nome"
                  value={novoExercicio.nome}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
                {erros.nome && (
                  <p className="text-red-500 text-sm">{erros.nome}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Grupo Muscular
                </label>
                <input
                  type="text"
                  name="grupoMuscular"
                  value={novoExercicio.grupoMuscular}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
                {erros.grupoMuscular && (
                  <p className="text-red-500 text-sm">{erros.grupoMuscular}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Tipo</label>
                <input
                  type="text"
                  name="tipo"
                  value={novoExercicio.tipo}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
                {erros.tipo && (
                  <p className="text-red-500 text-sm">{erros.tipo}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Dia da Semana
                </label>
                <input
                  type="text"
                  name="diaSemana"
                  value={novoExercicio.diaSemana}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
                {erros.diaSemana && (
                  <p className="text-red-500 text-sm">{erros.diaSemana}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Séries e Repetições
                </label>
                <input
                  type="text"
                  name="seriesRepeticoes"
                  value={novoExercicio.seriesRepeticoes}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
                {erros.seriesRepeticoes && (
                  <p className="text-red-500 text-sm">
                    {erros.seriesRepeticoes}
                  </p>
                )}
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2 hover:bg-gray-400"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  {editandoId ? "Salvar Alterações" : "Adicionar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="overflow-x-auto shadow rounded-2xl">
        <table className="min-w-full divide-y divide-gray-200 ">
          <thead className="bg-gray-700 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Nome</th>
              <th className="px-4 py-2 text-left">Grupo</th>
              <th className="px-4 py-2 text-left">Tipo</th>
              <th className="px-4 py-2 text-left">Dia</th>
              <th className="px-4 py-2 text-left">Séries</th>
              <th className="px-4 py-2 text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            {exercicios.map((ex) => (
              <tr key={ex.id}>
                <td className="px-4 py-2">{ex.nome}</td>
                <td className="px-4 py-2">{ex.grupoMuscular}</td>
                <td className="px-4 py-2">{ex.tipo}</td>
                <td className="px-4 py-2">{ex.diaSemana}</td>
                <td className="px-4 py-2">{ex.seriesRepeticoes}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => iniciarEdicao(ex.id)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 mr-2"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => excluirExercicio(ex.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
