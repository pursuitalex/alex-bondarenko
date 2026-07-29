/**
 * НАЗВИ ПРОЄКТІВ для секції «Вибрані проєкти».
 * Редагуй лише текст у лапках:
 *   name — назва проєкту
 *   year — рік
 *   type — тип / категорія (мала плашка справа)
 *
 * Порядок = порядок фото. Перший запис → фото 1 + лого logos/1.svg,
 * другий → фото 2 + logos/2.svg, і так далі.
 *
 * ЩОБ ПОМІНЯТИ ЗОБРАЖЕННЯ — два кроки, не один:
 *   1. поклади новий файл у assets/projects/ під тим самим номером (1.png…);
 *   2. виконай `npm run images`.
 * Другий крок обов'язковий: сайт вантажить не assets/, а стиснуті копії
 * public/projects/N.webp, які й створює ця команда.
 *
 * assets/ — локальна тека з оригіналами, вона НЕ в git (див. .gitignore).
 * Тому цей файл лежить тут, у src/content/, а не поруч із картинками.
 */
export const projects = [
  { name: "Єгор Шатайло", year: "2026", type: "Personal site" }, // 1
  { name: "AmberHats", year: "2024", type: "Fashion" }, //           2
  { name: "ManyLeads", year: "2024", type: "Technology" }, //   3
  { name: "Lelia", year: "2020", type: "E-commerce" }, //     4
  { name: "Natural-Backlink", year: "2024", type: "Technology" }, //      5
  { name: "AABO", year: "2023", type: "Mobile app" }, //    6
  { name: "AventuraLawyer", year: "2025", type: "Business" }, //    7
  { name: "VirtualEmployer", year: "2024", type: "Business" }, //    8
  { name: "MedEcho", year: "2023", type: "E-commerce" }, //    9
  { name: "UkrainianHelicopters", year: "2022", type: "Landing" }, //    10
];
