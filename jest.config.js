export default {
    testEnvironment: "node",
    transform: {
        "^.+\\.tsx?$": "ts-jest", // Для TypeScript
        "^.+\\.jsx?$": "babel-jest", // Для Babel
    },
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$", // Паттерн для файлов с тестами
};
