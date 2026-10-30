# uCharts 第三方代码

- 上游：[uCharts 官方仓库](https://gitee.com/uCharts/uCharts)，核对时的 HEAD 为 `a66ed42dfb599dc87464f76d41821e51a788d69c`（2023-11-04）。
- 本仓库 `src/components/qiun-data-charts/` 文件头注明 QIUN 版权所有和 Apache License 2.0；上游仓库的许可证副本见本目录 `LICENSE`。请保留已有版权和许可证声明。
- 仓库还包含 `src/components/qiun-error/` 和 `src/components/qiun-loading/`，作为图表组件的配套组件使用。
- 上游该版本的 uni-app 组件包和本仓库 npm 依赖 `@qiun/ucharts` 均标为 `2.5.0-20230101`。本地组件与上游文件并非逐字节一致，因此不能仅凭此认定本地组件的精确版本或全部修改历史。项目历史最早在提交 `d6d3b00` 引入这些文件。
- `src/components/qiun-data-charts/u-charts.js` 当前通过 npm 包导出图表引擎；维护时应一起核对本地组件、npm 引擎、双端样式及图表交互。缺失精确来源时不要直接覆盖本地文件。
