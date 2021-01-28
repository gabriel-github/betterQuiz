import React, { useState } from "react";
import styled from "styled-components";
// eslint-disable-next-line import/extensions
import db from "../db";
import { useRouter } from "next/router";

import Widget from "../src/components/Widget";
import Footer from "../src/components/Footer";

import GitHubCorner from "../src/components/GitHubCorner";
import QuizBackground from "../src/components/QuizBackground";

import QuizLogo from "../src/components/QuizLogo";
import Input from '../src/components/Input'

import Button from "../src/components/Button";
import QuizContainer from '../src/components/QuizContainer';

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    router.push(`/quiz?name=${name}`);  
  };

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo/>
        <Widget>
          <Widget.Header>
            <h1>Harry potter and secret chamber Quiz</h1>
          </Widget.Header>
          <Widget.Content>
            <form onSubmit={handleSubmit} method="get">
              <Input
                name="nomeDoUsuario"
                placeholder="Diz ai seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Button type="submit" disabled={name.length === 0}>
                Jogar {name}
              </Button>
            </form>
          </Widget.Content>
        </Widget>
        <Widget>
          <Widget.Content>
            <h1>Quiz da galera</h1>
            <p>lorem ipsum dolor sit amet, consectetur adipis</p>
          </Widget.Content>
        </Widget>

        <Footer />
      </QuizContainer>

      <GitHubCorner projectUrl="https://github.com/gabriel-github" />
    </QuizBackground>
  );
}
