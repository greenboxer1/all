const fs = require('fs'); // Модуль для работы с файлами
const readline = require('readline'); // Модуль для чтения ввода из консоли

// Создаём интерфейс для ввода данных пользователем
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Функция для определения разделителя в CSV
function detectDelimiter(line) {
    const possibleDelimiters = [',', ';', '\t', '|']; // Возможные разделители
    let maxCount = 0;
    let detectedDelimiter = ','; // По умолчанию запятая
    possibleDelimiters.forEach(delimiter => {
        const count = (line.split(delimiter).length - 1); // Считаем количество разделителей
        if (count > maxCount) {
            maxCount = count;
            detectedDelimiter = delimiter;
        }
    });
    return detectedDelimiter;
}

// Запрашиваем название файла у пользователя
rl.question('n: ', (filePath) => {
    try {
        // Читаем файл
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const lines = fileContent.trim().split('\n'); // Разбиваем на строки

        // Проверяем, есть ли данные
        if (lines.length < 1 || lines[0].trim() === '') {
            console.log('Файл пустой или не содержит данных');
            rl.close();
            return;
        }

        // Определяем разделитель по первой строке
        const delimiter = detectDelimiter(lines[0]);

        // Обрабатываем все строки (предполагаем, что заголовка нет, если есть — можно пропустить первую строку)
        const result = lines.map(line => {
            // Разбиваем строку на значения, убираем лишние пробелы и кавычки
            const values = line.split(delimiter).map(value => 
                value.trim().replace(/^"|"$/g, '').replace(/^'|'$/g, '')
            );
            // Формируем кортеж
            return `(${values.map(value => `'${value}'`).join(',')})`;
        });

        // Формируем итоговую строку: кортежи через запятую + точка с запятой в конце
        const output = result.join(',\n') + ';';

        // Записываем результат в файл output.txt
        fs.writeFileSync('output.txt', output, 'utf8');
        console.log('ok');
    } catch (error) {
        console.error('Ошибка:', error.message);
    }

    // Закрываем интерфейс ввода
    rl.close();
});