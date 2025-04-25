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

  useEffect(() => {
    const data = localStorage.getItem("exercicios");
    if (data) setExercicios(JSON.parse(data));
  }, []);

  useEffect(() => {
    localStorage.setItem("exercicios", JSON.stringify(exercicios));
  }, [exercicios]);

  const handleChange = (e) => {
    setNovoExercicio({ ...novoExercicio, [e.target.name]: e.target.value });
  };

  const adicionarExercicio = (e) => {
    e.preventDefault();
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
  };

  const iniciarEdicao = (id) => {
    const exercicio = exercicios.find((ex) => ex.id === id);
    setNovoExercicio(exercicio);
    setEditandoId(id); // Entrar no modo de edição
  };

  const excluirExercicio = (id) => {
    setExercicios(exercicios.filter((e) => e.id !== id));
  };

  return (
    <div className="p-6 max-w-5xl mx-auto text-white">
      <h1 className="text-5xl font-bold mb-4">Cadastro de Exercícios</h1>

      <form onSubmit={adicionarExercicio} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <input
          name="nome"
          value={novoExercicio.nome}
          onChange={handleChange}
          placeholder="Nome"
          className="border p-2 rounded"
          required
        />
        <input
          name="grupoMuscular"
          value={novoExercicio.grupoMuscular}
          onChange={handleChange}
          placeholder="Grupo Muscular"
          className="border p-2 rounded"
          required
        />
        <input
          name="tipo"
          value={novoExercicio.tipo}
          onChange={handleChange}
          placeholder="Tipo"
          className="border p-2 rounded"
          required
        />
        <input
          name="diaSemana"
          value={novoExercicio.diaSemana}
          onChange={handleChange}
          placeholder="Dia da Semana"
          className="border p-2 rounded"
          required
        />
        <input
          name="seriesRepeticoes"
          value={novoExercicio.seriesRepeticoes}
          onChange={handleChange}
          placeholder="Séries e Repetições"
          className="border p-2 rounded"
          required
        />
        <button
          type="submit"
          className={`${
            editandoId ? "bg-blue-500 hover:bg-blue-600" : "bg-green-500 hover:bg-green-600"
          } text-white px-4 py-2 rounded`}
        >
          {editandoId ? "Salvar Alterações" : "Adicionar"}
        </button>
      </form>

      <div className="overflow-x-auto shadow rounded-2xl">
        <table className="min-w-full divide-y divide-gray-200 rounded-5xl">
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
