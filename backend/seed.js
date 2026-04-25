require('dotenv').config();
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Question = require('./models/Question');
const { connectDB, sequelize } = require('./config/db');

const seedData = async () => {
    await connectDB();
    await sequelize.sync({ force: true });

    const salt = await bcrypt.genSalt(10);
    const teacherPassword = await bcrypt.hash('teacher123', salt);
    const studentPassword = await bcrypt.hash('student123', salt);

    await User.bulkCreate([
        { name: 'Admin Teacher', email: 'teacher@example.com', registerNumber: 'T001', password: teacherPassword, role: 'teacher' },
        { name: 'John Doe', email: 'student@example.com', registerNumber: 'S001', password: studentPassword, role: 'student' }
    ]);

    const questions = [
        // Aptitude - Quantitative (10 questions)
        { subject: 'Aptitude', category: 'Quantitative', questionText: 'If a person sells an article for $650 and gains 30%, what is the cost price?', options: ['$400', '$500', '$450', '$600'], correctAnswer: '$500' },
        { subject: 'Aptitude', category: 'Quantitative', questionText: 'The average of first five multiples of 3 is:', options: ['9', '12', '15', '18'], correctAnswer: '9' },
        { subject: 'Aptitude', category: 'Quantitative', questionText: 'What is 25% of 400?', options: ['50', '100', '150', '200'], correctAnswer: '100' },
        { subject: 'Aptitude', category: 'Quantitative', questionText: 'Find the simple interest on $1000 at 5% per annum for 2 years.', options: ['$50', '$100', '$150', '$200'], correctAnswer: '$100' },
        { subject: 'Aptitude', category: 'Quantitative', questionText: 'A train 150m long is running at 54 km/hr. How long will it take to pass a pole?', options: ['10s', '12s', '15s', '8s'], correctAnswer: '10s' },
        { subject: 'Aptitude', category: 'Quantitative', questionText: 'The ratio of two numbers is 3:4 and their sum is 70. Find the numbers.', options: ['30, 40', '20, 50', '35, 35', '25, 45'], correctAnswer: '30, 40' },
        { subject: 'Aptitude', category: 'Quantitative', questionText: 'A sum of money doubles itself in 10 years at simple interest. What is the rate of interest?', options: ['5%', '10%', '12%', '15%'], correctAnswer: '10%' },
        { subject: 'Aptitude', category: 'Quantitative', questionText: 'What is the square root of 625?', options: ['15', '20', '25', '30'], correctAnswer: '25' },
        { subject: 'Aptitude', category: 'Quantitative', questionText: 'If 5 people can build a wall in 10 days, how many days will it take 10 people?', options: ['5', '2', '20', '15'], correctAnswer: '5' },
        { subject: 'Aptitude', category: 'Quantitative', questionText: 'Solve: 120 / (4 + 2 * 3)', options: ['12', '20', '10', '15'], correctAnswer: '12' },

        // Programming - Java Basics (10 questions)
        { subject: 'Programming', category: 'Java Basics', questionText: 'Which of the following is not a Java features?', options: ['Dynamic', 'Architecture Neutral', 'Use of pointers', 'Object-oriented'], correctAnswer: 'Use of pointers' },
        { subject: 'Programming', category: 'Java Basics', questionText: 'What is the return type of the hashCode() method in the Object class?', options: ['Object', 'int', 'long', 'void'], correctAnswer: 'int' },
        { subject: 'Programming', category: 'Java Basics', questionText: 'Which package contains the Random class?', options: ['java.util', 'java.lang', 'java.io', 'java.net'], correctAnswer: 'java.util' },
        { subject: 'Programming', category: 'Java Basics', questionText: 'An interface with no fields or methods is known as a ______.', options: ['Runnable Interface', 'Marker Interface', 'Abstract Interface', 'Final Interface'], correctAnswer: 'Marker Interface' },
        { subject: 'Programming', category: 'Java Basics', questionText: 'Which keyword is used for accessing the features of a package?', options: ['package', 'import', 'extends', 'export'], correctAnswer: 'import' },
        { subject: 'Programming', category: 'Java Basics', questionText: 'In which process, a local variable has the same name as one of the instance variables?', options: ['Serialization', 'Variable Shadowing', 'Abstraction', 'Multi-threading'], correctAnswer: 'Variable Shadowing' },
        { subject: 'Programming', category: 'Java Basics', questionText: 'Which of the following is a reserved keyword in Java?', options: ['object', 'strictfp', 'main', 'system'], correctAnswer: 'strictfp' },
        { subject: 'Programming', category: 'Java Basics', questionText: 'What is the initial quantity of the ArrayList?', options: ['5', '10', '0', '100'], correctAnswer: '10' },
        { subject: 'Programming', category: 'Java Basics', questionText: 'Which of these classes are the direct subclasses of the Throwable class?', options: ['RuntimeException and Error', 'Exception and Error', 'RuntimeException and Exception', 'IOException and Exception'], correctAnswer: 'Exception and Error' },
        { subject: 'Programming', category: 'Java Basics', questionText: 'What is the extension of compiled java classes?', options: ['.js', '.txt', '.class', '.java'], correctAnswer: '.class' },

        // IoT (10 questions)
        { subject: 'IoT', category: 'General', questionText: 'What is the full form of MQTT?', options: ['Message Queue Telemetry Transport', 'Message Queuing Text Transfer', 'Machine Query Text Transport', 'Mobile Query Telemetry Transport'], correctAnswer: 'Message Queue Telemetry Transport' },
        { subject: 'IoT', category: 'General', questionText: 'Which sensor is used to measure humidity?', options: ['DHT11', 'LDR', 'PIR', 'Ultrasonic'], correctAnswer: 'DHT11' },
        { subject: 'IoT', category: 'General', questionText: 'What is the brain of an Arduino board?', options: ['Microprocessor', 'Microcontroller', 'RAM', 'Hard Drive'], correctAnswer: 'Microcontroller' },
        { subject: 'IoT', category: 'General', questionText: 'Which of the following is a low-power wireless communication technology?', options: ['Wi-Fi', 'Bluetooth Low Energy (BLE)', 'Ethernet', 'HTTP'], correctAnswer: 'Bluetooth Low Energy (BLE)' },
        { subject: 'IoT', category: 'General', questionText: 'What does IoT stand for?', options: ['Internet of Technology', 'Internal of Things', 'Internet of Things', 'Interaction of Things'], correctAnswer: 'Internet of Things' },
        { subject: 'IoT', category: 'General', questionText: 'Which protocol is lightweight and used in IoT?', options: ['HTTP', 'FTP', 'MQTT', 'SMTP'], correctAnswer: 'MQTT' },
        { subject: 'IoT', category: 'General', questionText: 'What is the primary function of a sensor in IoT?', options: ['Processing data', 'Storing data', 'Detecting changes in environment', 'Displaying data'], correctAnswer: 'Detecting changes in environment' },
        { subject: 'IoT', category: 'General', questionText: 'Which board is commonly used for IoT prototyping?', options: ['Raspberry Pi', 'Arduino Uno', 'ESP8266', 'All of the above'], correctAnswer: 'All of the above' },
        { subject: 'IoT', category: 'General', questionText: 'What does WSN stand for in IoT?', options: ['Wireless Sensor Network', 'Wired Sensor Network', 'Wireless Smart Network', 'World Sensor Network'], correctAnswer: 'Wireless Sensor Network' },
        { subject: 'IoT', category: 'General', questionText: 'Which layer of IoT handles data processing and storage?', options: ['Perception Layer', 'Network Layer', 'Middleware Layer', 'Application Layer'], correctAnswer: 'Middleware Layer' },
        // Logical Reasoning (10 questions)
        { subject: 'Aptitude', category: 'Logical Reasoning', questionText: 'Find the next number in the series: 2, 6, 12, 20, 30, ?', options: ['40', '42', '44', '46'], correctAnswer: '42' },
        { subject: 'Aptitude', category: 'Logical Reasoning', questionText: 'If WATER is written as YCVGT, then HKTG is written as:', options: ['FIRE', 'FISH', 'FROG', 'FREE'], correctAnswer: 'FIRE' },
        { subject: 'Aptitude', category: 'Logical Reasoning', questionText: 'Pointing to a photograph, a man said, "I have no brother or sister but that man\'s father is my father\'s son." Whose photograph was it?', options: ['His own', 'His son\'s', 'His father\'s', 'His nephew\'s'], correctAnswer: 'His son\'s' },
        { subject: 'Aptitude', category: 'Logical Reasoning', questionText: 'In a certain code language, COMPUTER is written as RFUVQNPC. How is MEDICINE written in that code?', options: ['MFEDJJOE', 'EOJDEJFM', 'MFEJDJOE', 'EOJDJEFM'], correctAnswer: 'EOJDJEFM' },
        { subject: 'Aptitude', category: 'Logical Reasoning', questionText: 'If A is to the South of B and C is to the East of B, in what direction is A with respect to C?', options: ['North-East', 'North-West', 'South-East', 'South-West'], correctAnswer: 'South-West' },
        { subject: 'Aptitude', category: 'Logical Reasoning', questionText: 'Choose the odd one out:', options: ['January', 'May', 'July', 'November'], correctAnswer: 'November' },
        { subject: 'Aptitude', category: 'Logical Reasoning', questionText: 'Look at this series: 7, 10, 8, 11, 9, 12, ... What number should come next?', options: ['7', '10', '12', '13'], correctAnswer: '10' },
        { subject: 'Aptitude', category: 'Logical Reasoning', questionText: 'Which word does NOT belong with the others?', options: ['Index', 'Glossary', 'Chapter', 'Book'], correctAnswer: 'Book' },
        { subject: 'Aptitude', category: 'Logical Reasoning', questionText: 'Odometer is to mileage as compass is to:', options: ['Speed', 'Hiking', 'Needle', 'Direction'], correctAnswer: 'Direction' },
        { subject: 'Aptitude', category: 'Logical Reasoning', questionText: 'If South-East becomes North, North-East becomes West and so on. What will West become?', options: ['North-East', 'North-West', 'South-East', 'South-West'], correctAnswer: 'South-East' },

        // Verbal Ability (10 questions)
        { subject: 'Aptitude', category: 'Verbal Ability', questionText: 'Select the synonym for "ABANDON":', options: ['Keep', 'Leave', 'Join', 'Follow'], correctAnswer: 'Leave' },
        { subject: 'Aptitude', category: 'Verbal Ability', questionText: 'Select the antonym for "ENORMOUS":', options: ['Soft', 'Tiny', 'Weak', 'Tiny'], correctAnswer: 'Tiny' },
        { subject: 'Aptitude', category: 'Verbal Ability', questionText: 'Choose the correctly spelled word:', options: ['Accomodate', 'Acommodate', 'Accommodate', 'Accomodait'], correctAnswer: 'Accommodate' },
        { subject: 'Aptitude', category: 'Verbal Ability', questionText: 'He ____ to the store yesterday.', options: ['go', 'goes', 'went', 'gone'], correctAnswer: 'went' },
        { subject: 'Aptitude', category: 'Verbal Ability', questionText: 'Identify the part of speech for the word "Quickly":', options: ['Noun', 'Verb', 'Adjective', 'Adverb'], correctAnswer: 'Adverb' },
        { subject: 'Aptitude', category: 'Verbal Ability', questionText: 'Change the sentence to passive voice: "The chef cooked the meal."', options: ['The meal is cooked by the chef.', 'The meal was cooked by the chef.', 'The meal has been cooked by the chef.', 'The meal is being cooked by the chef.'], correctAnswer: 'The meal was cooked by the chef.' },
        { subject: 'Aptitude', category: 'Verbal Ability', questionText: 'Fill in the blank: "She is the ____ of the two sisters."', options: ['tall', 'taller', 'tallest', 'more tall'], correctAnswer: 'taller' },
        { subject: 'Aptitude', category: 'Verbal Ability', questionText: 'What is the plural of "Criteria"?', options: ['Criterias', 'Criterion', 'Criteria', 'Criterions'], correctAnswer: 'Criteria' },
        { subject: 'Aptitude', category: 'Verbal Ability', questionText: 'Select the meaning of the idiom: "To burn the midnight oil"', options: ['To cook late', 'To work hard till late night', 'To waste oil', 'To sleep early'], correctAnswer: 'To work hard till late night' },
        { subject: 'Aptitude', category: 'Verbal Ability', questionText: 'Identify the error: "Each of the students have finished their work."', options: ['Each of', 'the students', 'have finished', 'their work'], correctAnswer: 'have finished' }
    ];

    await Question.bulkCreate(questions);
    console.log('SQLite Data Seeded Successfully with 10 questions per subject.');
    process.exit();
};

seedData();
