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
import Input from "../src/components/Input";

import Button from "../src/components/Button";
import QuizContainer from "../src/components/QuizContainer";

import { motion } from "framer-motion";
import Link from "../src/components/Link";

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
        <QuizLogo />
        <Widget
          as={motion.section}
          transition={{ duration: 0.6, delay: 0.5 }}
          variants={{
            show: { opacity: 1, y: "0" },
            hidden: { opacity: 0, y: "100%" },
          }}
          initial="hidden"
          animate="show"
        >
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
        <Widget
          as={motion.section}
          transition={{ duration: 0.5, delay: 0.5 }}
          variants={{
            show: { opacity: 1, y: "0" },
            hidden: { opacity: 0, y: "100%" },
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Content>
            <h1>Quiz da galera</h1>
            <ul>
              {db.external.map((external, index) => {
                const [projectName, githubUser] = external
                  .replace(/\//g, "")
                  .replace("https:", "")
                  .replace(".vercel.app", "")
                  .split(".");
                return (
                  <li key={index}>
                    <Widget.Topic
                      as={Link}
                      href={`/quiz/${projectName}___${githubUser}`}
                      disabled={name.length === 0}
                    >{`${githubUser}/${projectName}`}</Widget.Topic>
                  </li>
                );
              })}
            </ul>
          </Widget.Content>
        </Widget>

        <Footer
          as={motion.footer}
          transition={{ duration: 0.4, delay: 0.5 }}
          variants={{
            show: { opacity: 1, y: "0" },
            hidden: { opacity: 0, y: "100%" },
          }}
          initial="hidden"
          animate="show"
        />
      </QuizContainer>

      <GitHubCorner projectUrl="https://github.com/gabriel-github" />
    </QuizBackground>
  );
}
