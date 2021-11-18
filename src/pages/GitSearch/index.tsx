import './styles.css';

import ResultCard from 'components/ResultCard';
import { useState } from 'react';
import axios from 'axios';
import ResultCardLink from 'components/ResultCardLink';
import GitInfoLoader from './GitInfoLoader';

type FormData = {
  username: string;
};

type Address = {
  login: string;
  id: string;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: string;
  name: string;
  company: string;
  blog: string;
  location: string;
  email: string;
  hireable: string;
  bio: string;
  twitter_username: string;
  public_repos: string;
  public_gists: string;
  followers: string;
  following: string;
  created_at: string;
  updated_at: string;
};

const GitSearch = () => {
  const [address, setAddress] = useState<Address>();

  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    username: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    axios
      .get(`https://api.github.com/users/${formData.username}`)
      .then((response) => {
        setAddress(response.data);
      })
      .catch((error) => {
        setAddress(undefined);
        console.log(error);
      }).finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="git-search-container">
        <div className="search-card">
          <h1>Encontre um perfil Github</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-container">
              <input
                type="text"
                name="username"
                value={formData.username}
                className="search-input"
                placeholder="Usuário Github"
                onChange={handleChange}
              />
              <button type="submit" className="btn btn-primary search-button">
                Encontrar
              </button>
            </div>
          </form>
        </div>
        {(isLoading ? <GitInfoLoader /> :  address && (
          <>
            <div className="details-card">
              <div className="container-img">
                <img src={address?.avatar_url} alt={address?.name}></img>
              </div>
              <div className="container-details">
                <h6>Informações</h6>
                <ResultCardLink title="Perfil: " href={address?.url} />
                <ResultCard
                  title="Seguidores: "
                  description={address?.followers}
                />
                <ResultCard
                  title="Localidade: "
                  description={address?.location}
                />
                <ResultCard title="Nome: " description={address?.name} />
              </div>
            </div>
          </>
        ))}
      </div>
  );
};

export default GitSearch;
