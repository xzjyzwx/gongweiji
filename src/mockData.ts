import { Task, Equipment, MoldRecord, MoldInventory, EquipRepair, InspectionTask, StorageApplication } from './types';

export const mockStorageApplications: StorageApplication[] = [
  {
    id: 'SA20260526001',
    type: '产成品入库',
    status: '待提交',
    materialCode: 'MA00031',
    materialName: '扁绕包线',
    spec: 'AB',
    weight: 250.5,
    spoolNo: 'SP-2026-001',
    applicant: '张三',
    applyTime: '2026-05-26 10:15:00',
  },
  {
    id: 'SA20260526002',
    type: '废品入库',
    status: '审核中',
    materialCode: 'MA00032',
    materialName: '缩醛漆包铜圆线-裸铜废丝',
    spec: 'AB',
    weight: 45.2,
    applicant: '李四',
    applyTime: '2026-05-26 11:30:00',
    notes: '断线废品'
  },
  {
    id: 'SA20260526003',
    type: '产成品入库',
    status: '已入库',
    materialCode: 'MA00019',
    materialName: '纸包硬铜扁线',
    spec: 'AAA',
    weight: 310.0,
    spoolNo: 'SP-2026-003',
    applicant: '王五',
    applyTime: '2026-05-25 15:00:00',
  }
];

export const mockInspectionTasks: InspectionTask[] = [
  {
    id: 'INSP20260526001',
    type: '首件检',
    status: '待检验',
    materialCode: 'MA00031',
    materialName: '扁绕包线',
    spec: 'AB',
    submitter: '张三',
    submitTime: '2026-05-26 08:30:00',
    machineId: 'HX-Y4',
    orderId: 'PG20260400047'
  },
  {
    id: 'INSP20260526002',
    type: '完工送检',
    status: '检验中',
    materialCode: 'MA00032',
    materialName: '缩醛漆包铜圆线',
    spec: 'AB',
    submitter: '李四',
    submitTime: '2026-05-26 09:15:00',
    inspector: '王五',
    machineId: '拉丝机A',
    orderId: 'PG20260400049'
  },
  {
    id: 'INSP20260526003',
    type: '在库检',
    status: '已完成',
    result: '合格',
    materialCode: 'MA00019',
    materialName: '纸包硬铜扁线',
    spec: 'AAA',
    submitter: '系统自动',
    submitTime: '2026-05-25 14:00:00',
    inspector: '赵六',
    inspectTime: '2026-05-25 15:30:00',
  },
  {
    id: 'INSP20260526004',
    type: '巡检',
    status: '已完成',
    result: '不合格',
    materialCode: 'MA00033',
    materialName: '聚酯亚胺漆包线',
    spec: 'AB',
    submitter: '钱七',
    submitTime: '2026-05-26 10:00:00',
    inspector: '王五',
    inspectTime: '2026-05-26 10:30:00',
    machineId: '漆包线机A',
  }
];

export const mockMoldInventory: MoldInventory[] = [
  { id: 'MOLD-001-AB', type: '绕包模', spec: 'AB', model: 'CD', remainingLife: 85, status: 'available' },
  { id: 'MOLD-002-AB', type: '涂漆模', spec: 'AB', model: 'CD', remainingLife: 42, status: 'available' },
  { id: 'MOLD-003-AB', type: '拉丝模', spec: 'AB', model: 'CD', remainingLife: 3, status: 'available' },
  { id: 'MOLD-004-AAA', type: '纸包模', spec: 'AAA', model: '2026', remainingLife: 99, status: 'available' },
  { id: 'MOLD-005-AB', type: '绕包模', spec: 'AB', model: 'CD', remainingLife: 15, status: 'available' },
];

export const mockEquipRepairs: EquipRepair[] = [
  { id: '1', reportNo: 'SBBX2509260001', reportTime: '09-26 15:52', status: '待维修', equipName: '高速互联带', reportType: '(GHX-029)', subEquip: '双头收线机(带配电柜)', faultDesc: '', reporter: '刘新江', repairer: '' },
  { id: '2', reportNo: 'SBBX2510150002', reportTime: '10-15 14:27', status: '待验收', equipName: '拉丝设备生产线', reportType: '(HX-ZL1)', subEquip: '收线机', faultDesc: '无动作', reporter: '苏声波', repairer: '夏宇', repairTime: '10-15 14:39\n04-14 16:51', actualFaultDesc: '2', repairContent: '345', remarks: '44', spareParts: '轴承 x2\n润滑油 x1', repairCompletionTime: '2026-04-14 16:51' },
  { id: '3', reportNo: 'SBBX2510150003', reportTime: '10-15 14:44', status: '维修中', equipName: '汇流带生产线', reportType: '(HX-Y4)', subEquip: '单头收线机', faultDesc: '无动作', reporter: '苏声波', repairer: '卢荣刚', repairTime: '10-15 14:51\n04-28 06:55', actualFaultDesc: '311', repairContent: '124', remarks: '135' },
  { id: '4', reportNo: 'SBBX2603160004', reportTime: '03-16 11:35', status: '临时验收', equipName: '汇流带生产线', reportType: '(HX-Y4)', subEquip: '涂锡储线一体机', faultDesc: '异响', reporter: '苏声波', repairer: '彭长', repairTime: '03-19 14:09\n04-29 07:07', actualFaultDesc: '233444', repairContent: '23244ff', remarks: '' },
  { id: '5', reportNo: 'SBBX2604300006', reportTime: '04-30 15:27', status: '维修中', equipName: '拉丝设备生产线', reportType: '(HX-ZL1)', subEquip: '收线机', faultDesc: '无动作', reporter: '苏声波', repairer: '卢荣刚', repairTime: '04-30 15:28\n04-30 16:35', actualFaultDesc: '33', repairContent: '22', remarks: '11' },
];

export const mockTasks: Task[] = [
  {
    id: 'PG20260400047',
    materialCode: 'MA00031',
    materialName: '聚酯亚胺漆包铜圆线',
    planQty: 2000,
    reportQty: 0,
    dispatchQty: 1000,
    unit: 'kg',
    process: '漆包',
    spec: '1.25mm',
    model: 'QZY-2/180',
    planStartTime: '2026-04-16 14:30:00',
    planEndTime: '2026-04-30 14:30:00',
    status: 'pending',
    orderStatus: '未开工',
    materialLoadStatus: '未上料',
    moldStatus: '未上模',
    bom: [
      { id: 'BOM-001', materialCode: 'CU-FLAT-001', materialName: '裸铜圆线', spec: '1.25mm', requiredQty: 1000, loadedQty: 0, unit: 'kg' }
    ]
  },
  {
    id: 'PG20260400049',
    materialCode: 'MA00032',
    materialName: '缩醛漆包铜圆线',
    planQty: 2500,
    reportQty: 0,
    dispatchQty: 1200,
    unit: 'kg',
    process: '涂漆',
    spec: '1.00mm',
    model: 'QQ-2',
    planStartTime: '2026-04-16 14:33:00',
    planEndTime: '2026-05-01 14:33:00',
    status: 'pending',
    bom: [
      { id: 'BOM-003', materialCode: 'CU-ROUND-001', materialName: '裸铜圆线', spec: 'Φ1.00mm', requiredQty: 800, loadedQty: 0, unit: 'kg' },
      { id: 'BOM-004', materialCode: 'EN-PVF-001', materialName: '聚乙烯醇缩醛漆', spec: 'PVF-1', requiredQty: 50, loadedQty: 0, unit: 'kg' }
    ]
  },
  {
    id: 'PG20260400050',
    materialCode: 'MA00033',
    materialName: '聚酯亚胺漆包线',
    planQty: 20,
    reportQty: 6,
    dispatchQty: 20,
    unit: '卷',
    process: '拉丝',
    spec: 'AB',
    model: 'CD',
    planStartTime: '2026-04-16 14:34:00',
    planEndTime: '2026-12-31 23:59:00',
    status: 'in-progress',
    bom: [
      { id: 'BOM-005', materialCode: 'CU-ROD-001', materialName: '无氧铜杆', spec: 'Φ8.0mm', requiredQty: 2000, loadedQty: 500, unit: 'kg' },
      { id: 'BOM-006', materialCode: 'LUBE-001', materialName: '拉丝润滑液', spec: 'L-01', requiredQty: 100, loadedQty: 20, unit: 'L' }
    ]
  },
  {
    id: 'PG20260400073',
    materialCode: 'MA00019',
    materialName: '纸包硬铜扁线',
    planQty: 22,
    reportQty: 0,
    dispatchQty: 5,
    unit: '卷',
    process: '纸包',
    spec: 'AAA',
    model: '2026',
    planStartTime: '2026-04-29 12:00:00',
    planEndTime: '2026-04-29 14:00:00',
    status: 'pending',
    bom: [
      { id: 'BOM-007', materialCode: 'CU-FLAT-002', materialName: '硬质裸铜扁线', spec: '2.5mm*5.0mm', requiredQty: 600, loadedQty: 0, unit: 'kg' },
      { id: 'BOM-008', materialCode: 'INS-PAPER-001', materialName: '电力电缆纸', spec: '0.045mm', requiredQty: 30, loadedQty: 0, unit: '卷' }
    ]
  }
];

export const mockEquipments: Equipment[] = [
  { id: 'E1', name: '拉丝机A' },
  { id: 'E2', name: '绕包机组' },
  { id: 'E3', name: '漆包线机' },
  { id: 'E4', name: '检验台B' },
  { id: 'E5', name: '装配线A' },
];

export const mockMoldRecords: MoldRecord[] = [];
