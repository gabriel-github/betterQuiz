import React from 'react'
import { ThemeProvider } from 'styled-components'
import QuizScreen from './index'

export default function QuizDaGaleraPage({dbExterno}) {
  return(
    <ThemeProvider theme={dbExterno.theme}>
      <QuizScreen  externalQuestions={dbExterno.questions}
      externalBg={dbExterno.bg}
      />
    </ThemeProvider>
  )
}

export async function getServerSideProps(context) {
  const [projectName, githubUser] = context.query.id.split('___')
  try {
    const dbExterno = await fetch(`https://${projectName}.${githubUser}.vercel.app/api/db`)
    .then(response => {
      if(response.ok) return response.json()
    }).then(response => response)
  
    return {
      props: {
        dbExterno,
      },
    };
  }
  catch (err) {
    throw new Error(err)
  }
}