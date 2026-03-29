GenUI + MCP Apps 似乎可玩性很高。

一个 MCP Tool 定义的 ui resource 只是一个渲染引擎，而不必非要是确定性的 UI，UI 可以通过 LLM 生成然后由渲染引擎渲染。

LLM 调用这个 MCP Tool 时，给予一定参数，比如“股票”，此时 MCP Server 知道了要渲染股票相关的 UI，但是这个 UI 里面具体渲染可能是动态生成的，MCP Server 通过 sampling 使用 MCP Client 的 LLM 生成 UI JSON（配合 Vercel 的 [JSON-render](https://json-render.dev/)），然后动态渲染这个 JSON。

**简单示例**：

```typescript
import { getCatalogPrompt } from "@json-render/core";

const RESOURCE_MIME_TYPE = "application/html"; // 返回 JSON Spec 而非 HTML

registerAppResource(
  server,
  resourceUri,
  { mimeType: RESOURCE_MIME_TYPE },
  async (params) => {
    const { symbol } = params;

    // 1. 获取真实股票数据（Server 端能力）
    const stockData = await fetchStockData(symbol);

    // 2. 将 Catalog 转换为 Prompt 约束指令
    const catalogPrompt = getCatalogPrompt(stockCatalog);

    // 3. 通过 Sampling 请求 Client 的 LLM 生成 JSON Spec
    const jsonSpec = await server.sampling({
      messages: [
        {
          role: "user",
          content: `
你是一个 UI 生成器。请根据以下股票数据和组件目录，生成一个股票实时界面的 JSON Spec。

## 组件目录（你只能使用以下组件）
${catalogPrompt}

## 实时股票数据
${JSON.stringify(stockData, null, 2)}

## 要求
1. 只使用目录中定义的组件
2. 输出严格的 JSON 格式
3. 布局要合理：先展示股票卡片和价格，再展示详细数据，最后展示操作按钮
4. 根据涨跌情况选择合适的 trend 和 color
5. 只返回 JSON，不要其他文字
          `.trim(),
        },
      ],
    });

    // 4. 返回渲染出的 HTML 模板
    return {
      contents: [
        {
          uri: resourceUri,
          mimeType: RESOURCE_MIME_TYPE,
          // 运行在服务端或客户端的渲染引擎
          text: renderGenUIHTMLTemplate(jsonSpec),
        },
      ],
    };
  },
);
```
