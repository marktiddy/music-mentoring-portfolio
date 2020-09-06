export const portfolio_qs = {
  partA: {
    title: 'Part A - Take Part',
    description:
      'Take part in an arts activity and develop your skills. You can work on your own or as part of a group',

    content: [
      {
        type: 'image',
        question:
          "Upload a screenshot of your first session's work and add a caption",
        imageURL: '',
        imageName: '',
        imageCaption: '',
      },
      {
        type: 'textarea',
        question: 'Describe the arts activity you took part in',
        answer: '',
        size: 1,
      },
      {
        type: 'image',
        question: 'Record you doing your arts activity here:',
        imageURL: '',
        imageName: '',
        imageCaption: '',
      },
      {
        type: 'list',
        question: 'What did you learn?',
        answer: ['', '', '', '', '', ''],
      },
      {
        type: 'list',
        question: 'List three things you enjoyed doing and why',

        answer: ['', '', ''],
      },
      {
        type: 'listarea',
        question:
          "Describe what arts skills you developed that you didn't have before",
        answer: ['', '', '', ''],
        size: 2,
      },
      {
        type: 'listarea',
        question: 'Describe how you have improved your arts skills',
        answer: ['', '', '', ''],
        size: 2,
      },
      {
        type: 'image',
        question:
          "Upload a screenshot of your final session's work and add a caption",
        imageURL: '',
        imageName: '',
        imageCaption: '',
      },
      {
        type: 'media',
        question: 'Upload a short audio or video clip of your final project',
        mediaURL: '',
        mediaName: '',
        mediaCaption: '',
        mediaType: '',
      },
      {
        type: 'staticText',
        title: 'Mentor Comment',
        content: 'Your mentor will need to complete this section',
      },
      {
        type: 'textarea',
        question: 'Provide some feedback about the mentee',
        answer: '',
        size: 2,
      },
    ],
  },
  partB: {
    title: 'Part B - Be the Audience',
    description:
      'In this part you explore the arts as an audience member and record your response',
    content: [
      {
        type: 'staticText',
        title: 'Top Tip',
        content:
          'The arts experience may be in your school/centre, an arranged visit or something you see or do on your own or with others',
      },
      {
        type: 'listText',
        title: 'Examples of arts experiences include:',
        content: [
          'Exhibitions (museums or galleries)',
          'Plays',
          'Gigs',
          'Arts Festivals',
          'Comedy Shows',
          'Performances and fashion shows',
          'Studio/backstage tours',
          'Online events',
          'Films/radio plays',
          'Public art',
        ],
      },
      {
        type: 'textarea',
        question: 'What did you experience as an audience member?',
        answer: '',
        size: 2,
      },
      {
        type: 'textarea',
        question: 'What did you enjoy most and why?',
        answer: '',
        size: 2,
      },
      {
        type: 'choice',
        question: 'What art forms were involved?',
        options: [
          { choice: 'Literature/Poetry', isChecked: false },
          { choice: 'Collections/Exhibitions', isChecked: false },
          { choice: 'Circus', isChecked: false },
          { choice: 'Photography', isChecked: false },
          { choice: 'Music', isChecked: false },
          { choice: 'Film', isChecked: false },
          { choice: 'Drama', isChecked: false },
          { choice: 'Architecture', isChecked: false },
          { choice: 'Dance', isChecked: false },
          { choice: 'Visual Art', isChecked: false },
          { choice: 'Sculpture', isChecked: false },
          { choice: 'Radio', isChecked: false },
          { choice: 'Design', isChecked: false },
          { choice: 'Technical Theatre', isChecked: false },
          { choice: 'Fashion and Costume', isChecked: false },
          { choice: 'Digital Arts', isChecked: false },
        ],
      },
      {
        type: 'textarea',
        question: 'What do you think could have been done better?',
        answer: '',
        size: 2,
      },
      {
        type: 'textarea',
        question: 'Would you recommend it to others? Explain why.',
        answer: '',
        size: 2,
      },
      {
        type: 'image',
        question: 'Record how you shared your views with others',
        imageURL: '',
        imageName: '',
        imageCaption: '',
      },
      {
        type: 'textarea',
        question: 'What my mentor thought about the views I shared',
        answer: '',
        size: 2,
      },
    ],
  },
  partC: {
    title: 'Part C - Arts Inspiration',
    description:
      'Find out about an artist, craftsperson or arts practitioner who inspires you or whose work you really like. Research their work and life and summarise what you found out.',
    content: [
      {
        type: 'textarea',
        question: 'My arts inspiration is:',
        tip:
          "They can be famous or not but they can't be a fictional character",
        answer: '',
        size: 1,
      },
      {
        type: 'list',
        question: 'Why they inspire me',
        tip:
          'Focus on the arts related career or practice of your chosen arts inspiration',
        answer: ['', '', ''],
      },
      {
        type: 'textarea',
        question: 'What they make or do? (e.g. genre, example of their art)',
        answer: '',
        size: 1,
      },
      {
        type: 'textarea',
        question:
          'How do they make or do their work? (e.g. instrumentation, how do they capture their art)',
        answer: '',
        size: 1,
      },
      {
        type: 'list',
        question:
          'What do other people think of their work? (e.g. quotes from critics, social media etc.)',
        answer: ['', '', ''],
      },
      {
        type: 'list',
        question: 'What I like about their work',
        answer: ['', '', ''],
      },
      {
        type: 'list',
        question:
          'What I have found out about their arts career, life and work',
        answer: ['', '', '', '', '', ''],
      },
      {
        type: 'image',
        question:
          'Make a poster in Canva of your chosen inspiration and share it here',
        imageURL: '',
        imageName: '',
        imageCaption: '',
      },
    ],
  },
  partD: {
    title: 'Part D - Arts Skill Share',
    description:
      'This part is about beginning to be an arts leader and passing on your skills to others',
    content: [
      {
        type: 'listText',
        title: 'A few ideas...',
        content: [
          "Leading a 'creative' session with a friend or group of people",
          'A presentation followed by questions and answers',
          "An online tutorial or 'how to' guide",
          'Supporting an arts activity by running part of a workshop',
        ],
      },
      {
        type: 'textarea',
        question:
          'Choosing your activity: What arts skill would you like to share? Explain why.',
        answer: '',
        size: 1,
      },
      {
        type: 'list',
        question: 'My plan: How are you going to do it?',
        answer: ['1. ', '2. ', '3. ', '4. '],
      },
      {
        type: 'textarea',
        question: 'Who will I work with?',
        answer: '',
        size: 1,
      },
      {
        type: 'list',
        question:
          'What practice or preparation are you going to do beforehand?',
        answer: ['', '', ''],
      },
      {
        type: 'list',
        question: 'How are you going to make it fun and interesting?',
        answer: ['', '', ''],
      },
      {
        type: 'list',
        question: 'How will you know if it has been a success?',
        tip: 'Think about how you will gather feedback from others',
        answer: ['', '', ''],
      },
      {
        type: 'image',
        question: 'Record how you shared your skills with others - Image 1',
        imageURL: '',
        imageName: '',
        imageCaption: '',
      },
      {
        type: 'image',
        question: 'Record how you shared your skills with others - Image 2',
        imageURL: '',
        imageName: '',
        imageCaption: '',
      },
      {
        type: 'staticText',
        title: 'Reviewing your arts skill share',
        content: 'How well did you share your skills? What did you learn?',
      },
      {
        type: 'textarea',
        question: 'What went well?',
        answer: '',
        size: 2,
      },
      {
        type: 'textarea',
        question: 'Did it go to plan?',
        tip: "Don't worry if it didn't go to plan, just say why",
        answer: '',
        size: 2,
      },
      {
        type: 'textarea',
        question: 'What would I do differently next time?',
        answer: '',
        size: 2,
      },
      {
        type: 'textarea',
        question: 'What did others think?',
        answer: '',
        size: 2,
      },
    ],
  },
  style: {
    bgColor: '#4a5568',
    textColor: 'white',
    mainTextColor: 'black',
    uuid: '',
  },
};
