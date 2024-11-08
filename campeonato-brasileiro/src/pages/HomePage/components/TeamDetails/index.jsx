import { useState, useEffect } from 'react';
import { Container, Dropdown, Card } from 'react-bootstrap';
// import { teams } from '../../../../mocks/mockData'; // Comentado para usar dados da API
import { getAllTeams, getTeamDetails } from '../../../../services/footballService.js'; // Importe as funções de requisição da API
import './style.css';

const TeamDetails = () => {
  const [teams, setTeams] = useState([]); // Para armazenar a lista de times
  const [selectedTeam, setSelectedTeam] = useState(null); // Para armazenar o time selecionado

  // Carregar a lista de times ao montar o componente
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const data = await getAllTeams();
        setTeams(data);
      } catch (error) {
        console.error("Erro ao obter os times:", error);
      }
    };

    fetchTeams();
  }, []);

  // Função para buscar detalhes do time selecionado
  const handleSelect = async (eventKey) => {
    try {
      const team = await getTeamDetails(eventKey);
      setSelectedTeam(team);
    } catch (error) {
      console.error(`Erro ao buscar detalhes do time com ID ${eventKey}:`, error);
    }
  };

  return (
    <Container>
      <h2 className="text-center mb-3">Selecione um Time</h2>
      <Dropdown onSelect={handleSelect} className="text-center mb-4">
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {selectedTeam ? selectedTeam.nome : 'Escolha um time'}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {teams.map((team) => (
            <Dropdown.Item key={team.id} eventKey={team.id}>
              {team.nome}
            </Dropdown.Item>
          ))}
          {/* Comentário do mock para referência:
          {teams.map((team) => (
            <Dropdown.Item key={team.id} eventKey={team.id}>
              {team.nome}
            </Dropdown.Item>
          ))}
          */}
        </Dropdown.Menu>
      </Dropdown>

      {selectedTeam && (
        <Card className="mt-3">
          <Card.Body>
            <Card.Title className="text-center"><strong>{selectedTeam.nome}</strong></Card.Title>
            <div className="team-info d-flex align-items-center justify-content-center">
              <Card.Img variant="top" src={selectedTeam.escudo} alt={`${selectedTeam.nome} Escudo`} className="team-escudo" />
              <div className="ml-3">
                <p><strong>Sigla:</strong> {selectedTeam.sigla}</p>
                <p><strong>Vitórias:</strong> {selectedTeam.vitorias}</p>
                <p><strong>Empates:</strong> {selectedTeam.empates}</p>
                <p><strong>Derrotas:</strong> {selectedTeam.derrotas}</p>
              </div>
            </div>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default TeamDetails;
