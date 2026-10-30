// Replace this local example with a business API when starting a project.
export interface ExampleItem {
  id: string
  name: string
  description: string
}

const items: ExampleItem[] = [
  { id: '1', name: '示例事项', description: '将此示例替换为实际业务数据。' },
  { id: '2', name: '第二个事项', description: '列表和详情共用同一份数据。' },
]

export async function listExampleItems(): Promise<ExampleItem[]> {
  return items.map(item => ({ ...item }))
}

export async function getExampleItem(id: string): Promise<ExampleItem | undefined> {
  return (await listExampleItems()).find(item => item.id === id)
}
