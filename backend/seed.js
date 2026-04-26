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
        // Aptitude - Quantitative (20 Questions)
        { subject: 'Aptitude', category: 'Quantitative', questionText: 'What is 15% of 200?', options: ['20', '30', '40', '50'], correctAnswer: '30' },
        { subject: 'Aptitude', category: 'Quantitative', questionText: 'A car travels 300km in 5 hours. Speed?', options: ['50 km/h', '60 km/h', '70 km/h', '80 km/h'], correctAnswer: '60 km/h' },
        { subject: 'Aptitude', category: 'Quantitative', questionText: 'Square root of 144?', options: ['10', '11', '12', '14'], correctAnswer: '12' },
        { subject: 'Aptitude', category: 'Quantitative', questionText: 'Next in series: 2, 4, 8, 16, ?', options: ['24', '30', '32', '36'], correctAnswer: '32' },
        { subject: 'Aptitude', category: 'Quantitative', questionText: 'If 3x = 12, then x+5 = ?', options: ['7', '8', '9', '10'], correctAnswer: '9' },
        { subject: 'Aptitude', category: 'Quantitative', questionText: 'Value of 2^5?', options: ['16', '32', '64', '128'], correctAnswer: '32' },
        { subject: 'Aptitude', category: 'Quantitative', questionText: 'Sum of angles in a triangle?', options: ['90', '180', '270', '360'], correctAnswer: '180' },
        { subject: 'Aptitude', category: 'Quantitative', questionText: 'Average of 10, 20, 30?', options: ['15', '20', '25', '30'], correctAnswer: '20' },
        { subject: 'Aptitude', category: 'Quantitative', questionText: 'Area of square with side 5?', options: ['10', '15', '20', '25'], correctAnswer: '25' },
        { subject: 'Aptitude', category: 'Quantitative', questionText: '1000 / 25?', options: ['30', '40', '50', '60'], correctAnswer: '40' },
        { subject: 'Aptitude', category: 'Quantitative', questionText: 'Cube root of 27?', options: ['2', '3', '4', '5'], correctAnswer: '3' },
        { subject: 'Aptitude', category: 'Quantitative', questionText: '1/2 + 1/4?', options: ['1/3', '2/6', '3/4', '1/6'], correctAnswer: '3/4' },
        { subject: 'Aptitude', category: 'Quantitative', questionText: 'Number of minutes in 2.5 hours?', options: ['120', '150', '180', '200'], correctAnswer: '150' },
        { subject: 'Aptitude', category: 'Quantitative', questionText: 'Prime number between 10 and 15?', options: ['11', '12', '14', '15'], correctAnswer: '11' },
        { subject: 'Aptitude', category: 'Quantitative', questionText: '10% of 500?', options: ['40', '50', '60', '70'], correctAnswer: '50' },
        { subject: 'Aptitude', category: 'Quantitative', questionText: '7 * 8?', options: ['48', '54', '56', '62'], correctAnswer: '56' },
        { subject: 'Aptitude', category: 'Quantitative', questionText: 'Smallest two digit prime?', options: ['10', '11', '13', '17'], correctAnswer: '11' },
        { subject: 'Aptitude', category: 'Quantitative', questionText: 'HCF of 12 and 18?', options: ['3', '4', '6', '9'], correctAnswer: '6' },
        { subject: 'Aptitude', category: 'Quantitative', questionText: 'Is 121 a perfect square?', options: ['Yes', 'No', 'Maybe', 'None'], correctAnswer: 'Yes' },
        { subject: 'Aptitude', category: 'Quantitative', questionText: '30% of 60?', options: ['12', '15', '18', '21'], correctAnswer: '18' },

        // Aptitude - Logical Reasoning (20 Questions)
        { subject: 'Aptitude', category: 'Logical Reasoning', questionText: 'Book is to Reading as Fork is to ?', options: ['Drawing', 'Writing', 'Eating', 'Sleeping'], correctAnswer: 'Eating' },
        { subject: 'Aptitude', category: 'Logical Reasoning', questionText: 'Finger : Hand :: Toe : ?', options: ['Foot', 'Knee', 'Leg', 'Arm'], correctAnswer: 'Foot' },
        { subject: 'Aptitude', category: 'Logical Reasoning', questionText: 'Find odd one: Apple, Banana, Carrot, Grapes', options: ['Apple', 'Banana', 'Carrot', 'Grapes'], correctAnswer: 'Carrot' },
        { subject: 'Aptitude', category: 'Logical Reasoning', questionText: 'If RED is 27, BLUE is ?', options: ['30', '40', '45', '50'], correctAnswer: '40' },
        { subject: 'Aptitude', category: 'Logical Reasoning', questionText: 'Which word does NOT belong?', options: ['Index', 'Glossary', 'Chapter', 'Book'], correctAnswer: 'Book' },
        { subject: 'Aptitude', category: 'Logical Reasoning', questionText: 'Odometer is to mileage as compass is to', options: ['Speed', 'Hiking', 'Direction', 'Needle'], correctAnswer: 'Direction' },
        { subject: 'Aptitude', category: 'Logical Reasoning', questionText: 'Marathon is to race as hibernation is to', options: ['Winter', 'Bear', 'Dream', 'Sleep'], correctAnswer: 'Sleep' },
        { subject: 'Aptitude', category: 'Logical Reasoning', questionText: 'Window is to pane as book is to', options: ['Novel', 'Glass', 'Cover', 'Page'], correctAnswer: 'Page' },
        { subject: 'Aptitude', category: 'Logical Reasoning', questionText: 'Cup is to coffee as bowl is to', options: ['Dish', 'Soup', 'Spoon', 'Food'], correctAnswer: 'Soup' },
        { subject: 'Aptitude', category: 'Logical Reasoning', questionText: 'Yard is to inch as quart is to', options: ['Gallon', 'Ounce', 'Milk', 'Liquid'], correctAnswer: 'Ounce' },
        { subject: 'Aptitude', category: 'Logical Reasoning', questionText: 'Next: A, C, E, G, ?', options: ['H', 'I', 'J', 'K'], correctAnswer: 'I' },
        { subject: 'Aptitude', category: 'Logical Reasoning', questionText: 'Cat : Kitten :: Dog : ?', options: ['Puppy', 'Cub', 'Calf', 'Foal'], correctAnswer: 'Puppy' },
        { subject: 'Aptitude', category: 'Logical Reasoning', questionText: 'Cold : Hot :: Up : ?', options: ['Left', 'Right', 'Down', 'Back'], correctAnswer: 'Down' },
        { subject: 'Aptitude', category: 'Logical Reasoning', questionText: 'Ocean : Water :: Desert : ?', options: ['Sand', 'Cactus', 'Heat', 'Sun'], correctAnswer: 'Sand' },
        { subject: 'Aptitude', category: 'Logical Reasoning', questionText: 'Pen : Write :: Knife : ?', options: ['Cut', 'Eat', 'Cook', 'Sharp'], correctAnswer: 'Cut' },
        { subject: 'Aptitude', category: 'Logical Reasoning', questionText: 'Bird : Fly :: Fish : ?', options: ['Walk', 'Jump', 'Swim', 'Run'], correctAnswer: 'Swim' },
        { subject: 'Aptitude', category: 'Logical Reasoning', questionText: 'Tree : Leaf :: Flower : ?', options: ['Stem', 'Petal', 'Root', 'Seed'], correctAnswer: 'Petal' },
        { subject: 'Aptitude', category: 'Logical Reasoning', questionText: 'Day : Night :: Sun : ?', options: ['Star', 'Moon', 'Cloud', 'Sky'], correctAnswer: 'Moon' },
        { subject: 'Aptitude', category: 'Logical Reasoning', questionText: 'Clock : Time :: Ruler : ?', options: ['Length', 'Weight', 'Volume', 'Speed'], correctAnswer: 'Length' },
        { subject: 'Aptitude', category: 'Logical Reasoning', questionText: 'Monday : Tuesday :: Friday : ?', options: ['Saturday', 'Sunday', 'Wednesday', 'Thursday'], correctAnswer: 'Saturday' },

        // Aptitude - Verbal Ability (20 Questions)
        { subject: 'Aptitude', category: 'Verbal Ability', questionText: 'Synonym of "HAPPY"?', options: ['Sad', 'Joyful', 'Angry', 'Bored'], correctAnswer: 'Joyful' },
        { subject: 'Aptitude', category: 'Verbal Ability', questionText: 'Antonym of "GIANT"?', options: ['Large', 'Huge', 'Tiny', 'Big'], correctAnswer: 'Tiny' },
        { subject: 'Aptitude', category: 'Verbal Ability', questionText: 'Correct spelling?', options: ['Receive', 'Recieve', 'Recive', 'Receve'], correctAnswer: 'Receive' },
        { subject: 'Aptitude', category: 'Verbal Ability', questionText: 'Meaning of "ABANDON"?', options: ['Keep', 'Leave', 'Start', 'Find'], correctAnswer: 'Leave' },
        { subject: 'Aptitude', category: 'Verbal Ability', questionText: 'Opposite of "BRAVE"?', options: ['Coward', 'Strong', 'Fearless', 'Bold'], correctAnswer: 'Coward' },
        { subject: 'Aptitude', category: 'Verbal Ability', questionText: 'Synonym of "QUICK"?', options: ['Slow', 'Fast', 'Lazy', 'Weak'], correctAnswer: 'Fast' },
        { subject: 'Aptitude', category: 'Verbal Ability', questionText: 'Choose correctly: "She ____ to the store yesterday."', options: ['go', 'goes', 'went', 'going'], correctAnswer: 'went' },
        { subject: 'Aptitude', category: 'Verbal Ability', questionText: 'Plural of "Child"?', options: ['Childs', 'Children', 'Childrens', 'Childes'], correctAnswer: 'Children' },
        { subject: 'Aptitude', category: 'Verbal Ability', questionText: 'A person who writes books?', options: ['Author', 'Painter', 'Singer', 'Doctor'], correctAnswer: 'Author' },
        { subject: 'Aptitude', category: 'Verbal Ability', questionText: 'Passive voice: "The chef cooked the meal."', options: ['Meal is cooked', 'Meal was cooked', 'Meal has been cooked', 'Meal is being cooked'], correctAnswer: 'Meal was cooked' },
        { subject: 'Aptitude', category: 'Verbal Ability', questionText: 'Synonym of "ANCIENT"?', options: ['New', 'Modern', 'Old', 'Young'], correctAnswer: 'Old' },
        { subject: 'Aptitude', category: 'Verbal Ability', questionText: 'Opposite of "SHARP"?', options: ['Blunt', 'Pointy', 'Edge', 'Cutting'], correctAnswer: 'Blunt' },
        { subject: 'Aptitude', category: 'Verbal Ability', questionText: 'Fill: "I have ____ apple."', options: ['a', 'an', 'the', 'some'], correctAnswer: 'an' },
        { subject: 'Aptitude', category: 'Verbal Ability', questionText: 'Meaning of "BENEVOLENT"?', options: ['Cruel', 'Kind', 'Mean', 'Selfish'], correctAnswer: 'Kind' },
        { subject: 'Aptitude', category: 'Verbal Ability', questionText: 'Synonym of "COURAGE"?', options: ['Fear', 'Bravery', 'Weakness', 'Shyness'], correctAnswer: 'Bravery' },
        { subject: 'Aptitude', category: 'Verbal Ability', questionText: 'Correct spelling?', options: ['Occurred', 'Ocured', 'Occured', 'Ocureed'], correctAnswer: 'Occurred' },
        { subject: 'Aptitude', category: 'Verbal Ability', questionText: 'Antonym of "ARROGANT"?', options: ['Humble', 'Proud', 'Vain', 'Bold'], correctAnswer: 'Humble' },
        { subject: 'Aptitude', category: 'Verbal Ability', questionText: 'Meaning of "FRAGILE"?', options: ['Strong', 'Tough', 'Breakable', 'Hard'], correctAnswer: 'Breakable' },
        { subject: 'Aptitude', category: 'Verbal Ability', questionText: 'Synonym of "GENEROUS"?', options: ['Greedy', 'Giving', 'Mean', 'Stingy'], correctAnswer: 'Giving' },
        { subject: 'Aptitude', category: 'Verbal Ability', questionText: 'Opposite of "PUBLIC"?', options: ['Open', 'General', 'Private', 'Common'], correctAnswer: 'Private' },

        // Programming - Java Basics (20 Questions)
        { subject: 'Programming', category: 'Java Basics', questionText: 'Which keyword is used to create a class in Java?', options: ['class', 'struct', 'def', 'object'], correctAnswer: 'class' },
        { subject: 'Programming', category: 'Java Basics', questionText: 'Default value of boolean in Java?', options: ['true', 'false', '0', 'null'], correctAnswer: 'false' },
        { subject: 'Programming', category: 'Java Basics', questionText: 'Which of these is NOT a primitive type?', options: ['int', 'double', 'String', 'char'], correctAnswer: 'String' },
        { subject: 'Programming', category: 'Java Basics', questionText: 'Method used to print in Java?', options: ['System.out.print()', 'Console.write()', 'echo()', 'print()'], correctAnswer: 'System.out.print()' },
        { subject: 'Programming', category: 'Java Basics', questionText: 'Extension of Java compiled files?', options: ['.java', '.class', '.exe', '.obj'], correctAnswer: '.class' },
        { subject: 'Programming', category: 'Java Basics', questionText: 'Which access modifier makes a member accessible only within its class?', options: ['public', 'protected', 'private', 'default'], correctAnswer: 'private' },
        { subject: 'Programming', category: 'Java Basics', questionText: 'Keyword to inherit a class?', options: ['extends', 'implements', 'inherits', 'uses'], correctAnswer: 'extends' },
        { subject: 'Programming', category: 'Java Basics', questionText: 'Which loop is guaranteed to execute at least once?', options: ['for', 'while', 'do-while', 'foreach'], correctAnswer: 'do-while' },
        { subject: 'Programming', category: 'Java Basics', questionText: 'Keyword to define a constant in Java?', options: ['const', 'final', 'static', 'fixed'], correctAnswer: 'final' },
        { subject: 'Programming', category: 'Java Basics', questionText: 'Which package is imported by default?', options: ['java.util', 'java.io', 'java.lang', 'java.net'], correctAnswer: 'java.lang' },
        { subject: 'Programming', category: 'Java Basics', questionText: 'Size of int in Java?', options: ['16-bit', '32-bit', '64-bit', '8-bit'], correctAnswer: '32-bit' },
        { subject: 'Programming', category: 'Java Basics', questionText: 'Can a class implement multiple interfaces?', options: ['Yes', 'No', 'Sometimes', 'Never'], correctAnswer: 'Yes' },
        { subject: 'Programming', category: 'Java Basics', questionText: 'Keyword for current object instance?', options: ['this', 'self', 'super', 'me'], correctAnswer: 'this' },
        { subject: 'Programming', category: 'Java Basics', questionText: 'Method to find length of string?', options: ['size()', 'length()', 'count()', 'len()'], correctAnswer: 'length()' },
        { subject: 'Programming', category: 'Java Basics', questionText: 'Is Java platform independent?', options: ['Yes', 'No', 'Partially', 'Depends'], correctAnswer: 'Yes' },
        { subject: 'Programming', category: 'Java Basics', questionText: 'Used to handle exceptions?', options: ['try-catch', 'if-else', 'for-loop', 'switch'], correctAnswer: 'try-catch' },
        { subject: 'Programming', category: 'Java Basics', questionText: 'Starting index of an array?', options: ['0', '1', '-1', 'Any'], correctAnswer: '0' },
        { subject: 'Programming', category: 'Java Basics', questionText: 'Keyword to call parent constructor?', options: ['parent', 'super', 'this', 'base'], correctAnswer: 'super' },
        { subject: 'Programming', category: 'Java Basics', questionText: 'Does Java support multiple inheritance of classes?', options: ['Yes', 'No', 'With plugins', 'Maybe'], correctAnswer: 'No' },
        { subject: 'Programming', category: 'Java Basics', questionText: 'JRE stands for?', options: ['Java Run Engine', 'Java Runtime Environment', 'Java Real Edition', 'Java Remote Entity'], correctAnswer: 'Java Runtime Environment' },

        // IoT - General (20 Questions)
        { subject: 'IoT', category: 'General', questionText: 'What does IoT stand for?', options: ['Internet of Tools', 'Internet of Things', 'Intranet of Things', 'Internet of Tasks'], correctAnswer: 'Internet of Things' },
        { subject: 'IoT', category: 'General', questionText: 'Main component of IoT?', options: ['Sensors', 'Connectivity', 'Data Processing', 'All of above'], correctAnswer: 'All of above' },
        { subject: 'IoT', category: 'General', questionText: 'Common protocol for IoT?', options: ['HTTP', 'MQTT', 'FTP', 'SMTP'], correctAnswer: 'MQTT' },
        { subject: 'IoT', category: 'General', questionText: 'Device that converts physical signal to digital?', options: ['Actuator', 'Sensor', 'Router', 'Switch'], correctAnswer: 'Sensor' },
        { subject: 'IoT', category: 'General', questionText: 'Example of IoT device?', options: ['Smart Thermostat', 'Old Radio', 'Paper book', 'Stone'], correctAnswer: 'Smart Thermostat' },
        { subject: 'IoT', category: 'General', questionText: 'What is the "Brain" of an IoT system?', options: ['Cloud', 'Sensor', 'Microcontroller', 'Battery'], correctAnswer: 'Microcontroller' },
        { subject: 'IoT', category: 'General', questionText: 'Short range wireless tech used in IoT?', options: ['WiFi', 'Bluetooth', 'LoRaWAN', 'Satellite'], correctAnswer: 'Bluetooth' },
        { subject: 'IoT', category: 'General', questionText: 'MQTT is based on which model?', options: ['Client-Server', 'Peer-to-Peer', 'Publish-Subscribe', 'Master-Slave'], correctAnswer: 'Publish-Subscribe' },
        { subject: 'IoT', category: 'General', questionText: 'Major concern in IoT?', options: ['Security', 'Storage', 'Color', 'Weight'], correctAnswer: 'Security' },
        { subject: 'IoT', category: 'General', questionText: 'What provides unique identity to IoT devices?', options: ['IP Address', 'Physical Shape', 'Price', 'Owner Name'], correctAnswer: 'IP Address' },
        { subject: 'IoT', category: 'General', questionText: 'IIoT stands for?', options: ['Internal IoT', 'Industrial IoT', 'Intelligent IoT', 'Instant IoT'], correctAnswer: 'Industrial IoT' },
        { subject: 'IoT', category: 'General', questionText: 'Used for long range IoT?', options: ['NFC', 'Bluetooth', 'LoRa', 'Zigbee'], correctAnswer: 'LoRa' },
        { subject: 'IoT', category: 'General', questionText: 'What is Raspberry Pi?', options: ['A sensor', 'A credit-card sized computer', 'A software', 'A fruit'], correctAnswer: 'A credit-card sized computer' },
        { subject: 'IoT', category: 'General', questionText: 'Device that moves or controls a mechanism?', options: ['Sensor', 'Actuator', 'Gateway', 'Bus'], correctAnswer: 'Actuator' },
        { subject: 'IoT', category: 'General', questionText: 'Layer where data is analyzed?', options: ['Physical', 'Network', 'Application', 'Cloud'], correctAnswer: 'Cloud' },
        { subject: 'IoT', category: 'General', questionText: 'What is Arduino?', options: ['Web server', 'Open-source electronics platform', 'Database', 'Mobile OS'], correctAnswer: 'Open-source electronics platform' },
        { subject: 'IoT', category: 'General', questionText: 'NFC stands for?', options: ['Near Field Communication', 'Net File Control', 'Near Fast Connect', 'New Field Core'], correctAnswer: 'Near Field Communication' },
        { subject: 'IoT', category: 'General', questionText: 'Which tech allows devices to talk directly?', options: ['M2M', 'B2B', 'C2C', 'P2P'], correctAnswer: 'M2M' },
        { subject: 'IoT', category: 'General', questionText: 'Main advantage of IoT in homes?', options: ['Automation', 'High cost', 'Complex wiring', 'Manual work'], correctAnswer: 'Automation' },
        { subject: 'IoT', category: 'General', questionText: 'Is 5G helpful for IoT?', options: ['Yes', 'No', 'Maybe', 'Unknown'], correctAnswer: 'Yes' }
    ];

    await Question.bulkCreate(questions);
    console.log('SQLite Data Seeded Successfully with 20 questions per subject.');
    process.exit();
};

seedData();
