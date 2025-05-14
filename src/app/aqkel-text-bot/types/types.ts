export type ApiResponse = {
  choices: {
    message: {
      content: string;
    };
  };
};

export type ChatMessage = {
  userPrompt: string;
  aiAnswer: string;
};