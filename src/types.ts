export interface BOMItem {
  id: string;
  materialCode: string;
  barcode?: string;
  materialName: string;
  spec: string;
  requiredQty: number;
  loadedQty: number;
  unit: string;
}

export interface Task {
  id: string; // 派工单号
  taskOrderNo?: string; // 任务单号
  materialCode: string; // 物料编码
  materialName: string; // 物料名称
  planQty: number; // 计划数量
  reportQty: number; // 报工数量
  dispatchQty: number; // 派工数量
  unit: string; // 单位
  process: string; // 工序
  spec: string; // 规格
  model: string; // 型号
  planStartTime: string; // 计划开工时间
  planEndTime: string; // 计划完工时间
  status: 'pending' | 'in-progress' | 'completed';
  orderStatus?: '未开工' | '已开工' | '已暂停';
  materialLoadStatus?: '未上料' | '已上料';
  moldStatus?: '未上模' | '已上模';
  notes?: string; // 备注
  bom?: BOMItem[];
}

export interface MoldInventory {
  id: string;
  type: string;
  spec: string;
  model: string;
  remainingLife: number;
  status: 'available' | 'in-use' | 'maintenance';
}

export interface MoldRecord {
  id: string;
  taskId: string;
  action: 'mount' | 'unmount' | 'requisition' | 'return'; // 上模 / 下模 / 领用 / 归还
  moldId: string;
  operator: string;
  timestamp: string;
}

export interface EquipRepair {
  id: string;
  reportNo: string;
  reportTime: string;
  status: '待维修' | '维修中' | '待验收' | '临时验收';
  equipName: string;
  reportType: string;
  subEquip: string;
  faultDesc: string;
  reporter: string;
  repairer: string;
  repairTime?: string;
  actualFaultDesc?: string;
  repairContent?: string;
  remarks?: string;
  equipStatus?: string;
  spareParts?: string;
  repairCompletionTime?: string;
}

export interface Equipment {
  id: string;
  name: string;
}

export interface InspectionTask {
  id: string;
  type: '首件检' | '巡检' | '完工送检' | '在库检';
  status: '待检验' | '检验中' | '已完成';
  result?: '合格' | '不合格' | '部分让步接收';
  materialCode: string;
  materialName: string;
  spec: string;
  submitter: string;
  submitTime: string;
  inspector?: string;
  inspectTime?: string;
  machineId?: string;
  orderId?: string;
}

export interface StorageApplicationDetail {
  palletCode: string;
  boxCode: string;
  spoolCode: string;
  materialCode: string;
  customerMaterialCode: string;
  spec: string;
  netWeight: number;
}

export interface StorageApplication {
  id: string;
  type: '产成品入库' | '废品入库';
  status: '待提交' | '审核中' | '已入库';
  materialCode: string;
  materialName: string;
  spec: string;
  weight: number; 
  spoolNo?: string; 
  applicant: string;
  applyTime: string;
  notes?: string;
  details?: StorageApplicationDetail[];
}
