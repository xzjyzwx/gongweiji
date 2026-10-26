import React, { useState, useMemo } from 'react';
import { 
  ChevronLeft, ChevronRight, ChevronDown, User, Search, RefreshCw, ClipboardList, 
  CheckSquare, Archive, Settings, Wrench, AlertTriangle, 
  Activity, Zap, Info, Play, FileCheck, CheckCircle, Package,
  ScanLine, ListChecks, Barcode, CheckCircle2, ArrowRightLeft,
  XCircle, Scan, Plus, Trash2, ArrowLeft, Save, Pause, Filter, PackagePlus, Disc, Bug,
  FileText, Send, Clock, UserCheck, ShieldAlert, Award, AlertOctagon
} from 'lucide-react';
import { Task, MoldRecord, MoldInventory, EquipRepair, InspectionTask, StorageApplication } from './types';
import { mockTasks, mockEquipments, mockMoldRecords, mockMoldInventory, mockEquipRepairs, mockInspectionTasks, mockStorageApplications } from './mockData';

const mockOnlineInspectionData = [
  {
    id: '1',
    time: '2026-05-26 09:15:23',
    taskId: 'PG20260400047',
    spoolNo: 'P001-123',
    defectCode: 'D001',
    defectName: '漆包线针孔缺陷',
    defectLevel: '严重',
    defectPosition: 12.5,
    defectImage: 'D20260526091523.jpg',
    machineId: 'QB-01',
    operator: '张三'
  },
  {
    id: '2',
    time: '2026-05-26 10:05:45',
    taskId: 'PG20260400047',
    spoolNo: 'P001-123',
    defectCode: 'D002',
    defectName: '表面刮伤缺陷',
    defectLevel: '一般',
    defectPosition: 5.8,
    defectImage: 'D20260526100545.jpg',
    machineId: 'QB-01',
    operator: '张三'
  },
  {
    id: '3',
    time: '2026-05-26 11:20:12',
    taskId: 'PG20260400049',
    spoolNo: 'P001-124',
    defectCode: 'D003',
    defectName: '绝缘厚度不均',
    defectLevel: '预警',
    defectPosition: 8.3,
    defectImage: 'D20260526112012.jpg',
    machineId: 'QB-02',
    operator: '李四'
  },
  {
    id: '4',
    time: '2026-05-26 13:30:55',
    taskId: 'PG20260400049',
    spoolNo: 'P001-124',
    defectCode: 'D004',
    defectName: '导体偏心缺陷',
    defectLevel: '严重',
    defectPosition: 3.2,
    defectImage: 'D20260526133055.jpg',
    machineId: 'QB-02',
    operator: '李四'
  }
];

// --- Components ---

const Header = ({ title, onBack }: { title: string, onBack?: () => void }) => (
  <header className="bg-[#1e3b5f] text-white h-12 flex items-center px-4 justify-between shrink-0">
    <div className="flex items-center w-1/3">
      {onBack && (
        <button onClick={onBack} className="p-1 hover:bg-white/10 rounded mr-2">
          <ChevronLeft size={24} />
        </button>
      )}
    </div>
    <div className="text-lg font-medium tracking-wider w-1/3 text-center">{title}</div>
    <div className="flex items-center justify-end w-1/3 space-x-2 text-sm">
      <User size={18} />
      <span>管理员</span>
    </div>
  </header>
);

const InspectView = ({ onBack }: { onBack: () => void }) => {
  const [tasks, setTasks] = useState<InspectionTask[]>(mockInspectionTasks);
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTasks = useMemo(() => {
    return tasks.filter(t => {
      if (filterType !== 'all' && t.type !== filterType) return false;
      if (filterStatus !== 'all' && t.status !== filterStatus) return false;
      if (searchQuery && !t.id.toLowerCase().includes(searchQuery.toLowerCase()) && 
          !t.materialCode.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !t.materialName.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      return true;
    });
  }, [tasks, filterType, filterStatus, searchQuery]);

  return (
    <div className="flex flex-col h-full bg-[#f4f6f8]">
      <Header title="检验任务" onBack={onBack} />
      
      <div className="p-4 bg-white border-b border-gray-200 flex flex-wrap items-center gap-4 shadow-sm z-10 shrink-0">
        <div className="flex items-center space-x-2 bg-gray-50 border border-gray-300 rounded px-3 py-1.5 focus-within:ring-2 focus-within:ring-blue-500 w-64">
          <Search size={16} className="text-gray-500" />
          <input 
            type="text" 
            placeholder="搜索检验单号/物料..." 
            className="bg-transparent outline-none text-sm w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center space-x-2">
          <Filter size={16} className="text-gray-500" />
          <select 
            className="border border-gray-300 rounded px-2 py-1.5 text-sm bg-gray-50 outline-none focus:ring-2 focus:ring-blue-500"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">所有检验类型</option>
            <option value="首件检">首件检</option>
            <option value="巡检">巡检</option>
            <option value="完工送检">完工送检</option>
            <option value="在库检">在库检</option>
          </select>

          <select 
            className="border border-gray-300 rounded px-2 py-1.5 text-sm bg-gray-50 outline-none focus:ring-2 focus:ring-blue-500"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">所有状态</option>
            <option value="待检验">待检验</option>
            <option value="检验中">检验中</option>
            <option value="已完成">已完成</option>
          </select>
        </div>
        
        <div className="flex-1"></div>
        <button className="bg-white border border-gray-300 hover:bg-gray-50 px-3 py-1.5 rounded text-sm font-medium flex items-center space-x-1 shadow-sm transition-colors text-gray-700">
           <RefreshCw size={14} />
           <span>刷新</span>
        </button>
      </div>

      <div className="flex-1 overflow-auto p-4">
        <div className="bg-white rounded shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="bg-gray-50 text-gray-600 border-b border-gray-200 font-medium">
              <tr>
                <th className="px-4 py-3">检验单号</th>
                <th className="px-4 py-3">检验类型</th>
                <th className="px-4 py-3">状态</th>
                <th className="px-4 py-3">检验结果</th>
                <th className="px-4 py-3">物料编码</th>
                <th className="px-4 py-3">物料名称</th>
                <th className="px-4 py-3">规格</th>
                <th className="px-4 py-3">送检人 / 时间</th>
                <th className="px-4 py-3">检验人 / 时间</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredTasks.length > 0 ? filteredTasks.map(task => (
                <tr key={task.id} className="hover:bg-blue-50/50 transition-colors cursor-pointer">
                  <td className="px-4 py-3 font-medium text-blue-600">{task.id}</td>
                  <td className="px-4 py-3 text-gray-700">{task.type}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      task.status === '已完成' ? 'bg-green-100 text-green-700' :
                      task.status === '待检验' ? 'bg-orange-100 text-orange-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {task.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {task.result ? (
                      <span className={`flex items-center space-x-1 ${
                        task.result === '合格' ? 'text-green-600' : 
                        task.result === '不合格' ? 'text-red-500' : 'text-yellow-600'
                      }`}>
                        {task.result === '合格' ? <CheckCircle2 size={16} /> : 
                         task.result === '不合格' ? <XCircle size={16} /> : <AlertTriangle size={16} />}
                        <span className="font-medium">{task.result}</span>
                      </span>
                    ) : <span className="text-gray-400">-</span>}
                  </td>
                  <td className="px-4 py-3 font-mono text-gray-600">{task.materialCode}</td>
                  <td className="px-4 py-3 text-gray-800">{task.materialName}</td>
                  <td className="px-4 py-3 text-gray-600">{task.spec}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col">
                      <span className="text-gray-800">{task.submitter}</span>
                      <span className="text-xs text-gray-500">{task.submitTime}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {task.inspector ? (
                      <div className="flex flex-col">
                        <span className="text-gray-800">{task.inspector}</span>
                        <span className="text-xs text-gray-500">{task.inspectTime || '-'}</span>
                      </div>
                    ) : <span className="text-gray-400">-</span>}
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={9} className="px-4 py-16 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center space-y-2">
                       <CheckSquare size={32} className="text-gray-300" />
                       <p>暂无相关检验任务数据</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const NewStorageApplyForm = ({ onBack, onSave }: { onBack: () => void, onSave: (app: StorageApplication) => void }) => {
  const [details, setDetails] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'spool' | 'box'>('spool');
  const [warehouse, setWarehouse] = useState<'成品仓库' | '废品仓库'>('成品仓库');
  
  const handleSave = () => {
     onSave({
       id: `SA${new Date().toISOString().replace(/\D/g,'').slice(0,14)}`,
       type: warehouse === '成品仓库' ? '产成品入库' : '废品入库',
       status: '待提交',
       materialCode: 'N/A',
       materialName: 'N/A',
       spec: 'N/A',
       weight: details.reduce((acc, d) => acc + d.netWeight, 0),
       applicant: '当前用户',
       applyTime: new Date().toISOString().slice(0, 19).replace('T', ' '),
       details: details
     });
  };

  return (
    <div className="flex flex-col h-full bg-[#1070a6] font-sans">
      {/* Top Header */}
      <div className="bg-[#1070a6] text-white flex justify-between items-center px-4 py-2 shrink-0 border-b-4 border-[#ffcd00]/0 hidden">
         {/* using different header layout derived from screenshot */}
      </div>
      
      <div className="bg-[#1070a6] text-white flex justify-between items-center px-4 py-1 shrink-0 h-14">
        <div className="flex items-center space-x-2">
          <div className="w-9 h-9 bg-black rounded flex items-center justify-center font-bold text-[22px] tracking-tighter shadow-sm overflow-hidden">
             <div className="bg-gradient-to-br from-[#1ea2e6] to-[#0d5f8c] w-full h-full flex items-center justify-center"><span className="text-white">S</span></div>
          </div>
          <span className="text-[22px] font-bold tracking-widest pl-2">金杯电磁线</span>
        </div>
        <div className="flex items-center space-x-6 pr-2">
           <div className="relative">
             <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
             <span className="absolute -top-1.5 -right-2 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">15</span>
           </div>
           <div className="border border-white/40 p-1.5 rounded-full cursor-pointer hover:bg-white/20 transition-colors" onClick={onBack}>
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
           </div>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col pt-1">
        <div className="bg-white border-t-2 border-[#a0a0a0] flex-1 flex flex-col relative">
           {/* Top controls */}
           <div className="border-b border-gray-400 p-2 flex flex-wrap gap-x-4 gap-y-2 items-center text-[13px]">
             <div className="flex items-center pl-1">
               <span className="font-bold mr-2 text-black">盘具条码:</span>
               <input 
                 type="text" 
                 className="border border-gray-400 px-2 py-0.5 w-[200px] focus:outline-none focus:border-blue-500 bg-[#f4f4f4]" 
                 onKeyDown={(e) => {
                   if (e.key === 'Enter' && e.currentTarget.value === '001') {
                     setDetails([{
                       taskOrderNo: 'RW-2026-0528-01',
                       materialCode: 'M-001-XYZ',
                       materialName: '铜包铝线',
                       spec: '2.5mm x 5.0mm',
                       spoolCode: 'SP-001',
                       model: 'CBM-X',
                       barcode: '001',
                       unit: 'KG',
                       length: '1000m',
                       theoreticalWeight: 45.0,
                       netWeight: 45.2,
                     }]);
                     e.currentTarget.value = '';
                   }
                 }}
               />
             </div>
             
             <div className="flex items-center space-x-2 pl-4">
               <input type="checkbox" className="w-4 h-4 bg-white border border-gray-400 rounded-sm" />
               <span className="text-black">不良品入库</span>
             </div>

             <div className="flex items-center space-x-2 pl-4">
               <span className="font-bold text-black">仓库:</span>
               <select 
                 className="border border-gray-400 px-1 py-0.5 w-[140px] focus:outline-none focus:border-blue-500 bg-[#e6f4ff] font-medium"
                 value={warehouse}
                 onChange={e => setWarehouse(e.target.value as any)}
               >
                 <option value="成品仓库">成品仓库</option>
                 <option value="废品仓库">废品仓库</option>
               </select>
             </div>
             
             <div className="flex-1"></div>
           </div>
           
           <div className="border-b border-gray-400 py-1.5 px-3 flex gap-x-6 items-center bg-[#f0f0f0] text-[13px]">
             <div className="flex items-center">
               <span className="font-bold text-black mr-2">日期:</span>
               <span className="text-black font-bold">2026-05-28</span>
             </div>
             <div className="flex items-center ml-2">
               <span className="font-bold text-black mr-2">客户:</span>
               <input type="text" className="bg-transparent outline-none w-24" />
             </div>
             <div className="flex flex-1 items-center ml-2">
               <span className="font-bold text-black mr-2">备注:</span>
               <input type="text" className="flex-1 border border-gray-400 px-2 py-0.5 focus:outline-none focus:border-blue-500 bg-white" />
             </div>
           </div>
           
           <div className="px-2 pt-2 flex items-center gap-0 border-b-2 border-black shrink-0 relative top-[1px]">
             <button 
               className="px-12 py-1.5 font-bold text-[14px] border border-b-0 border-black rounded-t-sm bg-[#3bb1db] text-black"
             >
               明细
             </button>
           </div>
           
           <div className="flex-1 overflow-auto bg-white border-t border-black">
             <table className="w-full text-center border-collapse">
               <thead className="text-[13px] sticky top-0 shadow-[0_1px_0_0_#ccc] z-10 bg-white">
                 <tr>
                   <th className="py-2 border-r border-b border-black font-bold text-black">生产任务单号</th>
                   <th className="py-2 border-r border-b border-black font-bold text-black">物料编码</th>
                   <th className="py-2 border-r border-b border-black font-bold text-black">物料名称</th>
                   <th className="py-2 border-r border-b border-black font-bold text-black">规格</th>
                   <th className="py-2 border-r border-b border-black font-bold text-black">盘具号</th>
                   <th className="py-2 border-r border-b border-black font-bold text-black">型号</th>
                   <th className="py-2 border-r border-b border-black font-bold text-black">条码</th>
                   <th className="py-2 border-r border-b border-black font-bold text-black">单位</th>
                   <th className="py-2 border-r border-b border-black font-bold text-black">长度</th>
                   <th className="py-2 border-r border-b border-black font-bold text-black">理论重量</th>
                   <th className="py-2 border-b border-black font-bold text-black">实际重量</th>
                 </tr>
               </thead>
               <tbody className="text-[13px]">
                 {details.length === 0 ? (
                   <tr>
                     <td colSpan={11} className="h-64"></td>
                   </tr>
                 ) : (
                   details.map((d, i) => (
                     <tr key={i} className="hover:bg-blue-50">
                       <td className="py-2 border-r border-b border-gray-300">{d.taskOrderNo}</td>
                       <td className="py-2 border-r border-b border-gray-300">{d.materialCode}</td>
                       <td className="py-2 border-r border-b border-gray-300">{d.materialName}</td>
                       <td className="py-2 border-r border-b border-gray-300">{d.spec}</td>
                       <td className="py-2 border-r border-b border-gray-300">{d.spoolCode}</td>
                       <td className="py-2 border-r border-b border-gray-300">{d.model}</td>
                       <td className="py-2 border-r border-b border-gray-300">{d.barcode}</td>
                       <td className="py-2 border-r border-b border-gray-300">{d.unit}</td>
                       <td className="py-2 border-r border-b border-gray-300">{d.length}</td>
                       <td className="py-2 border-r border-b border-gray-300">{d.theoreticalWeight}</td>
                       <td className="py-2 border-b border-gray-300">{d.netWeight}</td>
                     </tr>
                   ))
                 )}
               </tbody>
             </table>
           </div>
           
           <div className="border-t border-gray-400 py-3 flex justify-center bg-white shrink-0">
             <button 
               className="bg-[#1070a6] hover:bg-[#0c5985] text-white px-10 py-1.5 font-bold text-[15px]"
               onClick={handleSave}
             >
               保存
             </button>
           </div>
        </div>
      </div>
      
      {/* Bottom Status Bar */}
      <div className="bg-[#5cc0eb] text-black px-4 py-1.5 flex items-center justify-between font-bold text-[14px] shrink-0 border-t-2 border-[#3ea7d4]">
        <div className="flex items-center space-x-6">
          <div className="flex items-center cursor-pointer hover:opacity-70 transition-opacity" onClick={onBack}>
            <ChevronLeft size={28} className="text-[#3ea7d4] bg-white rounded-full p-0 mr-3 border-2 border-[#3ea7d4]" strokeWidth={3} />
            <span>工位机: 金杯电磁线</span>
          </div>
          <span>用户: 苏声波/白班</span>
          <span>当前时间: 2026-05-28 10:57</span>
        </div>
        <div className="flex items-center space-x-3 opacity-90">
           <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
           <Settings size={26} className="text-white" />
        </div>
      </div>
    </div>
  );
};

const StorageApplyView = ({ onBack }: { onBack: () => void }) => {
  const [applications, setApplications] = useState<StorageApplication[]>(mockStorageApplications);
  const [isCreating, setIsCreating] = useState(false);

  if (isCreating) {
    return <NewStorageApplyForm onBack={() => setIsCreating(false)} onSave={(app) => {
      setApplications([app, ...applications]);
      setIsCreating(false);
    }} />;
  }

  return (
    <div className="flex flex-col h-full bg-[#f4f6f8]">
      <Header title="入库申请" onBack={onBack} />
      <div className="p-4 bg-white border-b border-gray-200 flex flex-wrap items-center gap-4 shadow-sm z-10 shrink-0">
        <button 
          onClick={() => setIsCreating(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium flex items-center space-x-1 shadow-sm transition-colors"
        >
           <Plus size={16} />
           <span>新建申请</span>
        </button>
        <div className="flex-1"></div>
      </div>
      
      <div className="flex-1 overflow-auto p-4">
        <div className="bg-white rounded shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-sm text-center whitespace-nowrap">
            <thead className="bg-gray-50 text-gray-600 border-b border-gray-200 font-medium">
              <tr>
                <th className="px-4 py-3">申请单号</th>
                <th className="px-4 py-3">类型</th>
                <th className="px-4 py-3">状态</th>
                <th className="px-4 py-3">物料编码</th>
                <th className="px-4 py-3">物料名称</th>
                <th className="px-4 py-3">重量(kg)</th>
                <th className="px-4 py-3">线轴号/托盘</th>
                <th className="px-4 py-3">申请人/时间</th>
                <th className="px-4 py-3">备注</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {applications.map(app => (
                <tr key={app.id} className="hover:bg-blue-50/50 transition-colors">
                  <td className="px-4 py-3 font-medium text-blue-600">{app.id}</td>
                  <td className="px-4 py-3 text-gray-700">{app.type}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      app.status === '已入库' ? 'bg-green-100 text-green-700' :
                      app.status === '待提交' ? 'bg-orange-100 text-orange-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-gray-600">{app.materialCode}</td>
                  <td className="px-4 py-3 text-gray-800">{app.materialName}</td>
                  <td className="px-4 py-3 font-bold text-gray-700">{app.weight}</td>
                  <td className="px-4 py-3 text-gray-600">{app.spoolNo || '-'}</td>
                  <td className="px-4 py-3 text-left">
                    <div className="flex flex-col">
                      <span className="text-gray-800">{app.applicant}</span>
                      <span className="text-xs text-gray-500">{app.applyTime}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-500">{app.notes || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// --- Patrol Inspection Component ---

export interface SchemeInspectionItem {
  id: string;
  name: string;
  standard: string;
  unit: string;
  target?: number;
  min?: number;
  max?: number;
  tool: string;
  method: string;
  defaultValue: string;
  abnormalValue?: string;
}

export interface InspectionScheme {
  schemeId: string;
  schemeName: string;
  version: string;
  standardDoc: string;
  materialCode: string;
  materialName: string;
  spec: string;
  process: string;
  items: SchemeInspectionItem[];
}

export interface MaterialSpoolMapping {
  spoolNo: string;
  materialSN: string;
  orderNo: string;
  materialCode: string;
  materialName: string;
  spec: string;
  process: string;
  machineId: string;
  batchNo: string;
  operator: string;
  schemeId: string;
}

export const mockInspectionSchemes: Record<string, InspectionScheme> = {
  'FA-QZY-180-01': {
    schemeId: 'FA-QZY-180-01',
    schemeName: '《QZY-2/180 聚酯亚胺漆包铜圆线-巡回检验标准方案》',
    version: 'V3.2 (2026版)',
    standardDoc: 'GB/T 6109.20-2022 / 金杯特规 Q/CS 2026-09',
    materialCode: 'WL-2026-QZY180',
    materialName: '聚酯亚胺漆包圆铜线 QZY-2/180',
    spec: 'Φ 1.250mm (2级漆膜)',
    process: '漆包',
    items: [
      {
        id: 'IT-01',
        name: '线径外径',
        standard: '1.250 ± 0.008 mm (1.242 ~ 1.258)',
        unit: 'mm',
        target: 1.250,
        min: 1.242,
        max: 1.258,
        tool: '高精度数显千分尺(0.001mm)',
        method: '每盘首中尾三点测量，取平均值',
        defaultValue: '1.252',
        abnormalValue: '1.265'
      },
      {
        id: 'IT-02',
        name: '漆膜厚度',
        standard: '≥ 0.040 mm',
        unit: 'mm',
        min: 0.040,
        tool: '精密漆膜测厚仪 / 剥漆法',
        method: '截取试样测定四处涂覆层厚度',
        defaultValue: '0.043',
        abnormalValue: '0.034'
      },
      {
        id: 'IT-03',
        name: '高压针孔',
        standard: '≤ 2 个 / 5m',
        unit: '个/5m',
        max: 2,
        tool: '高压针孔电火花测试台 (1500V)',
        method: '连续走线5米，电火花击穿计数',
        defaultValue: '0',
        abnormalValue: '5'
      },
      {
        id: 'IT-04',
        name: '击穿电压(常温)',
        standard: '≥ 4.50 kV',
        unit: 'kV',
        min: 4.50,
        tool: '全自动高压击穿试验仪',
        method: '双线绞合加压法，升压速度500V/s',
        defaultValue: '5.35',
        abnormalValue: '3.80'
      },
      {
        id: 'IT-05',
        name: '软化击穿温度',
        standard: '≥ 450.0 ℃',
        unit: '℃',
        min: 450.0,
        tool: '微机控制软化击穿试验烘箱',
        method: '十字交叉加载加压法，5℃/min升温',
        defaultValue: '462.5',
        abnormalValue: '428.0'
      },
      {
        id: 'IT-06',
        name: '附着力(急拉断)',
        standard: '1D圆棒卷绕无裂纹，附着良好',
        unit: '级',
        tool: '卷绕试验机 & 40倍光学显微镜',
        method: '在自身直径圆棒上密绕10圈目测',
        defaultValue: '合格(无裂纹起皮)',
        abnormalValue: '不合格(局部漆膜开裂脱落)'
      }
    ]
  },
  'FA-QFPB-240-02': {
    schemeId: 'FA-QFPB-240-02',
    schemeName: '《Q(F)PB-3/240 缩醛漆包铜圆线-涂漆过程巡检规程》',
    version: 'V2.1',
    standardDoc: 'JB/T 7599.2-2021 电气绝缘圆线',
    materialCode: 'WL-2026-QFPB240',
    materialName: '缩醛漆包铜圆线 Q(F)PB-3/240',
    spec: 'Φ 2.120mm (3级厚漆膜)',
    process: '涂漆',
    items: [
      {
        id: 'IT-11',
        name: '涂漆外径',
        standard: '2.120 ± 0.012 mm (2.108 ~ 2.132)',
        unit: 'mm',
        target: 2.120,
        min: 2.108,
        max: 2.132,
        tool: '光学双轴激光测径仪',
        method: '在线激光连续径向取样',
        defaultValue: '2.123',
        abnormalValue: '2.142'
      },
      {
        id: 'IT-12',
        name: '绝缘同心度',
        standard: '≥ 85.0 %',
        unit: '%',
        min: 85.0,
        tool: '截面显微金相厚度测量仪',
        method: '垂直截面切片，显微测定同心比',
        defaultValue: '89.2',
        abnormalValue: '77.5'
      },
      {
        id: 'IT-13',
        name: '击穿电压',
        standard: '≥ 6.00 kV',
        unit: 'kV',
        min: 6.00,
        tool: '高压工频绝缘耐压机',
        method: '常温试样耐压测试',
        defaultValue: '6.85',
        abnormalValue: '5.10'
      },
      {
        id: 'IT-14',
        name: '耐变压器油试验',
        standard: '120℃变压器油浸泡168h无起泡',
        unit: '级',
        tool: '高温恒温耐油烘箱',
        method: '热油浸泡后测附着力与光洁度',
        defaultValue: '合格(漆膜光亮致密)',
        abnormalValue: '不合格(局部起泡溶胀)'
      }
    ]
  },
  'FA-SPEC-155-03': {
    schemeId: 'FA-SPEC-155-03',
    schemeName: '《特种耐温自粘复合漆包线-巡回检验作业规范》',
    version: 'V1.5',
    standardDoc: 'Q/JB 2026-SPEC03 航空电机特规',
    materialCode: 'WL-2026-SPEC155',
    materialName: '特种自粘聚酯亚胺复合漆包线',
    spec: 'Φ 0.800mm (双层自粘)',
    process: '漆包',
    items: [
      {
        id: 'IT-21',
        name: '复合线径外径',
        standard: '0.800 ± 0.006 mm (0.794 ~ 0.806)',
        unit: 'mm',
        target: 0.800,
        min: 0.794,
        max: 0.806,
        tool: '数显千分尺(0.001mm)',
        method: '每盘双端多角度测量',
        defaultValue: '0.802',
        abnormalValue: '0.814'
      },
      {
        id: 'IT-22',
        name: '自粘层粘结强度',
        standard: '≥ 12.0 N',
        unit: 'N',
        min: 12.0,
        tool: '微机电子万能拉力机',
        method: '螺旋试样热风粘接后抗剪剥离',
        defaultValue: '15.8',
        abnormalValue: '8.5'
      },
      {
        id: 'IT-23',
        name: '高压针孔',
        standard: '≤ 1 个 / 5m',
        unit: '个/5m',
        max: 1,
        tool: '针孔电火花测试仪',
        method: '在线连续高压放电扫描',
        defaultValue: '0',
        abnormalValue: '4'
      }
    ]
  },
  'FA-LS-CU-04': {
    schemeId: 'FA-LS-CU-04',
    schemeName: '《高导电电工裸铜线-大拉退火过程巡检规程》',
    version: 'V4.0',
    standardDoc: 'GB/T 3953-2020 电工圆铜线标准',
    materialCode: 'WL-2026-LSCU01',
    materialName: '高纯电工无氧裸铜线',
    spec: 'Φ 2.800mm (退火软态)',
    process: '拉丝',
    items: [
      {
        id: 'IT-31',
        name: '裸铜线外径',
        standard: '2.800 ± 0.010 mm (2.790 ~ 2.810)',
        unit: 'mm',
        target: 2.800,
        min: 2.790,
        max: 2.810,
        tool: '数显千分尺',
        method: '横截面双向测径',
        defaultValue: '2.803',
        abnormalValue: '2.824'
      },
      {
        id: 'IT-32',
        name: '断后伸长率(延伸率)',
        standard: '≥ 32.0 %',
        unit: '%',
        min: 32.0,
        tool: '高精金属线材延伸率测定仪',
        method: '标距250mm拉伸至断裂',
        defaultValue: '36.8',
        abnormalValue: '27.5'
      },
      {
        id: 'IT-33',
        name: '20℃直流电阻率',
        standard: '≤ 0.017241 Ω·mm²/m',
        unit: 'Ω·mm²/m',
        max: 0.017241,
        tool: '双臂直流电阻测试仪',
        method: '1米四端法精密电桥测定',
        defaultValue: '0.017165',
        abnormalValue: '0.017420'
      },
      {
        id: 'IT-34',
        name: '表面质量与氧化',
        standard: '表面光亮清洁，无毛刺氧化黑斑',
        unit: '级',
        tool: '目测与20倍放大镜',
        method: '拉拔连续目检',
        defaultValue: '合格(光洁亮丽无氧化)',
        abnormalValue: '不合格(局部铜绿氧化点)'
      }
    ]
  }
};

export const mockSpoolSNMappings: MaterialSpoolMapping[] = [
  {
    spoolNo: 'P001-123',
    materialSN: '2604046902001019',
    orderNo: 'PG20260400047',
    materialCode: 'WL-2026-QZY180',
    materialName: '聚酯亚胺漆包圆铜线 QZY-2/180',
    spec: 'Φ 1.250mm (2级漆膜)',
    process: '漆包',
    machineId: 'QB-01 (1号立式高速漆包机)',
    batchNo: 'BAT-20261022-01',
    operator: '张建军',
    schemeId: 'FA-QZY-180-01'
  },
  {
    spoolNo: 'P001-124',
    materialSN: '2604046902001020',
    orderNo: 'PG20260400049',
    materialCode: 'WL-2026-QFPB240',
    materialName: '缩醛漆包铜圆线 Q(F)PB-3/240',
    spec: 'Φ 2.120mm (3级厚漆膜)',
    process: '涂漆',
    machineId: 'QB-02 (2号卧式涂漆线)',
    batchNo: 'BAT-20261022-02',
    operator: '李志强',
    schemeId: 'FA-QFPB-240-02'
  },
  {
    spoolNo: 'P002-008',
    materialSN: '2604046902001021',
    orderNo: 'PG20260400050',
    materialCode: 'WL-2026-SPEC155',
    materialName: '特种自粘聚酯亚胺复合漆包线',
    spec: 'Φ 0.800mm (双层自粘)',
    process: '漆包',
    machineId: 'QB-03 (3号精细漆包机)',
    batchNo: 'BAT-20261022-03',
    operator: '周海平',
    schemeId: 'FA-SPEC-155-03'
  },
  {
    spoolNo: 'SP-LS-2026',
    materialSN: '2604046902008888',
    orderNo: 'PG20260400045',
    materialCode: 'WL-2026-LSCU01',
    materialName: '高纯电工无氧裸铜线',
    spec: 'Φ 2.800mm (退火软态)',
    process: '拉丝',
    machineId: 'LS-01 (1号大拉退火机组)',
    batchNo: 'BAT-20261022-04',
    operator: '陈师傅',
    schemeId: 'FA-LS-CU-04'
  }
];

interface PatrolInspectionRecord {
  id: string;
  orderNo: string;
  process: string;
  item: string;
  standard: string;
  measuredValue: string;
  result: '合格' | '不合格';
  inspector: string;
  inspectTime: string;
  machineId: string;
  spoolNo: string;
  ncrId?: string;
  schemeId?: string;
  materialSN?: string;
}

interface NCRRecord {
  id: string;
  sourceRecordId: string;
  orderNo: string;
  process: string;
  item: string;
  defectType: '工艺不合格' | '原料不合格' | '操作失误' | '设备工装不良' | '外观不良';
  defectReason: string;
  action: string;
  result: string;
  oaStatus: '未发起' | 'OA评审中' | 'OA评审通过' | 'OA已驳回';
  oaFlowId?: string;
  oaReviewer?: string;
  oaSuggestion?: string;
  rectificationId?: string;
  createTime: string;
  creator: string;
}

interface ProcessRectificationRecord {
  id: string;
  ncrId: string;
  orderNo: string;
  process: string;
  requirement: string;
  engineer: string;
  deadline: string;
  preventiveAction: string;
  verificationResult: string;
  status: '整改中' | '待复核' | '已闭环';
  createTime: string;
}

const PatrolInspectionView = ({ task, onBack }: { task?: Task, onBack: () => void }) => {
  const [activeTab, setActiveTab] = useState<'records' | 'ncr' | 'rectification'>('records');

  // 1. Process Inspection Records
  const [records, setRecords] = useState<PatrolInspectionRecord[]>([
    {
      id: 'XC-20261022-001',
      orderNo: 'PG20260400047',
      process: '漆包',
      item: '线径外径',
      standard: '1.250 ± 0.008 mm',
      measuredValue: '1.253 mm',
      result: '合格',
      inspector: '王建国',
      inspectTime: '2026-10-22 09:15:30',
      machineId: 'QB-01',
      spoolNo: 'P001-123'
    },
    {
      id: 'XC-20261022-002',
      orderNo: 'PG20260400047',
      process: '漆包',
      item: '漆膜厚度',
      standard: '≥ 0.040 mm',
      measuredValue: '0.043 mm',
      result: '合格',
      inspector: '王建国',
      inspectTime: '2026-10-22 10:20:12',
      machineId: 'QB-01',
      spoolNo: 'P001-123'
    },
    {
      id: 'XC-20261022-003',
      orderNo: 'PG20260400049',
      process: '涂漆',
      item: '软化击穿温度',
      standard: '≥ 450.0 ℃',
      measuredValue: '428.5 ℃ (偏低超差)',
      result: '不合格',
      inspector: '李志强',
      inspectTime: '2026-10-22 11:05:44',
      machineId: 'QB-02',
      spoolNo: 'P001-124',
      ncrId: 'NCR-20261022-001'
    },
    {
      id: 'XC-20261022-004',
      orderNo: 'PG20260400049',
      process: '拉丝',
      item: '延伸率',
      standard: '≥ 32.0 %',
      measuredValue: '35.4 %',
      result: '合格',
      inspector: '李志强',
      inspectTime: '2026-10-22 13:40:18',
      machineId: 'LS-01',
      spoolNo: 'P001-125'
    },
    {
      id: 'XC-20261022-005',
      orderNo: 'PG20260400050',
      process: '漆包',
      item: '高压针孔',
      standard: '≤ 2 个 / 5m',
      measuredValue: '5 个 / 5m (超标)',
      result: '不合格',
      inspector: '杨灵利',
      inspectTime: '2026-10-22 14:15:22',
      machineId: 'QB-03',
      spoolNo: 'P002-008',
      ncrId: 'NCR-20261022-002'
    },
    {
      id: 'XC-20261022-006',
      orderNo: 'PG20260400050',
      process: '绞线',
      item: '表面光洁度与节距',
      standard: '表面平整无划伤, 节距35±2mm',
      measuredValue: '表面光洁, 节距35.2mm',
      result: '合格',
      inspector: '杨灵利',
      inspectTime: '2026-10-22 15:02:10',
      machineId: 'JX-01',
      spoolNo: 'P002-009'
    }
  ]);

  // 2. NCR Records
  const [ncrs, setNcrs] = useState<NCRRecord[]>([
    {
      id: 'NCR-20261022-001',
      sourceRecordId: 'XC-20261022-003',
      orderNo: 'PG20260400049',
      process: '涂漆',
      item: '软化击穿温度 (实测428.5℃ < 450℃)',
      defectType: '工艺不合格',
      defectReason: '2号涂漆烘炉二温区发热元件老化，设定温控475℃但炉膛实际温场仅445℃，导致聚酯亚胺漆交联固化不足。',
      action: '整盘线材进行降温隔离，调阅烘烤测温历史数据；下发停机检修，制定工艺参数补偿方案。',
      result: '已移入不良品隔离区，标识黄色待处理标签；已由工艺技术部完成温区标定补偿，待复测。',
      oaStatus: 'OA评审中',
      oaFlowId: 'OA-20261022-0088',
      oaReviewer: '质量经理(已审) → 工艺总工(会签中) → 生产副总(待签批)',
      oaSuggestion: '同意对隔离线材降级为普通电机绕组线使用；责成工艺技术部限期完成温控工艺整改并出具整改记录。',
      rectificationId: 'PR-20261022-01',
      createTime: '2026-10-22 11:20:00',
      creator: '李志强'
    },
    {
      id: 'NCR-20261022-002',
      sourceRecordId: 'XC-20261022-005',
      orderNo: 'PG20260400050',
      process: '漆包',
      item: '高压针孔 (实测5个/5m > 标准≤2个)',
      defectType: '工艺不合格',
      defectReason: '浸漆毛毡夹持松紧不均，漆液流动性因环境降温粘度上升至38s，未能均匀包覆线体引发针孔。',
      action: '对当班涂覆成品截除超差段，重新调整漆槽循环加热温度及毛毡夹紧螺母。',
      result: '截除超标段60米，剩余合格段已标识复检合格；整改参数后试机取样针孔数为0。',
      oaStatus: '未发起',
      rectificationId: undefined,
      createTime: '2026-10-22 14:30:15',
      creator: '杨灵利'
    },
    {
      id: 'NCR-20261021-003',
      sourceRecordId: 'XC-20261021-008',
      orderNo: 'PG20260400047',
      process: '拉丝',
      item: '导体表面局部氧化变黑',
      defectType: '操作失误',
      defectReason: '作业员操作断线停机后未及时通入退火保护蒸汽气阀，铜线在高温空气中发生氧化。',
      action: '表面氧化段切除报废，责令操作班组复训停机标准防护操作程序SOP。',
      result: '切除废铜线12.5kg送交废品仓，已完成班组SOP考核，后续生产正常。',
      oaStatus: 'OA评审通过',
      oaFlowId: 'OA-20261021-0052',
      oaReviewer: '生产车间主管 → 质量总监(已批准归档)',
      oaSuggestion: '按操作规范处置，计入当月质量KPI考核，已闭环。',
      rectificationId: undefined,
      createTime: '2026-10-21 16:45:00',
      creator: '王建国'
    }
  ]);

  // 3. Process Rectification Records
  const [rectifications, setRectifications] = useState<ProcessRectificationRecord[]>([
    {
      id: 'PR-20261022-01',
      ncrId: 'NCR-20261022-001',
      orderNo: 'PG20260400049',
      process: '涂漆',
      requirement: '1. 重新校准并补偿二温区热电偶测温漂移，确保实际烘烤温场稳定在475±3℃；2. 漆包炉增加红外多点在线监测探头；3. 重新评定QZY-2漆料烘焙曲线并下发作业指导书工艺卡。',
      engineer: '邓工 (高级工艺工程师)',
      deadline: '2026-10-24 18:00',
      preventiveAction: '已更换PT100铠装热电偶并完成炉温多点温度梯度测定；作业指导书已增订温区巡检频次（每2小时点巡一次）。',
      verificationResult: '工艺部会同质量部取样进行3组软化击穿测试，实测软化击穿温度达462℃、459℃、465℃，均满足≥450℃标准，验证合格准予闭环。',
      status: '已闭环',
      createTime: '2026-10-22 11:45:00'
    },
    {
      id: 'PR-20261019-02',
      ncrId: 'NCR-20261019-004',
      orderNo: 'PG20260400045',
      process: '拉丝',
      requirement: '1. 全面排查聚晶钻石拉丝模套孔光洁度及磨损台阶；2. 将乳化液循环清洗过滤芯更换为10μm精滤；3. 调整润滑液浓度至8.5%~9.5%。',
      engineer: '陈工 (拉丝工艺主管)',
      deadline: '2026-10-21 12:00',
      preventiveAction: '已淘汰超差模具4只，已加装二级磁性分离过滤装置，乳化液折光浓度已调整至9.0%。',
      verificationResult: '连续跟踪拉制5吨裸铜线，无划伤无断线，线径公差CPK达到1.67，整改闭环。',
      status: '已闭环',
      createTime: '2026-10-19 14:00:00'
    }
  ]);

  // Filters
  const [filterProcess, setFilterProcess] = useState<string>('all');
  const [filterResult, setFilterResult] = useState<string>('all');
  const [searchKey, setSearchKey] = useState<string>('');

  // Modals state
  const [showAddRecordModal, setShowAddRecordModal] = useState(false);
  const [showOAModal, setShowOAModal] = useState<NCRRecord | null>(null);
  const [showRectificationModal, setShowRectificationModal] = useState<NCRRecord | null>(null);
  const [showVerifyModal, setShowVerifyModal] = useState<ProcessRectificationRecord | null>(null);
  const [showNewManualPRModal, setShowNewManualPRModal] = useState(false);

  // New Inspection Record Form state
  const [newOrderNo, setNewOrderNo] = useState('PG20260400047');
  const [newProcess, setNewProcess] = useState('漆包');
  const [newItem, setNewItem] = useState('线径外径');
  const [newStandard, setNewStandard] = useState('1.250 ± 0.008 mm');
  const [newMeasuredValue, setNewMeasuredValue] = useState('');
  const [newResult, setNewResult] = useState<'合格' | '不合格'>('合格');
  const [newInspector, setNewInspector] = useState('杨灵利');
  const [newMachineId, setNewMachineId] = useState('QB-01');
  const [newSpoolNo, setNewSpoolNo] = useState('P001-126');
  const [autoCreateNCR, setAutoCreateNCR] = useState(true);

  // OA Modal Form state
  const [oaTitle, setOaTitle] = useState('');
  const [oaReviewDept, setOaReviewDept] = useState('质量保证部、工艺技术部、制造生产部');
  const [oaUrgency, setOaUrgency] = useState<'普通' | '紧急' | '特急'>('紧急');
  const [oaSuggestionInput, setOaSuggestionInput] = useState('');

  // Rectification Modal Form state
  const [prRequirement, setPrRequirement] = useState('');
  const [prEngineer, setPrEngineer] = useState('邓工 (高级工艺工程师)');
  const [prDeadline, setPrDeadline] = useState('2026-10-25 18:00');
  const [prPreventiveAction, setPrPreventiveAction] = useState('');

  // Rectification Verify Form state
  const [verifyConclusion, setVerifyConclusion] = useState('');

  // Filtered records
  const filteredRecords = useMemo(() => {
    return records.filter(r => {
      if (filterProcess !== 'all' && r.process !== filterProcess) return false;
      if (filterResult !== 'all' && r.result !== filterResult) return false;
      if (searchKey) {
        const key = searchKey.toLowerCase();
        return r.orderNo.toLowerCase().includes(key) || 
               r.item.toLowerCase().includes(key) || 
               r.inspector.toLowerCase().includes(key);
      }
      return true;
    });
  }, [records, filterProcess, filterResult, searchKey]);

  // Presets & Schemas Matching States
  const [scanInput, setScanInput] = useState<string>('P001-123');
  const [scanType, setScanType] = useState<'all' | 'spool' | 'sn'>('all');
  const [currentMatchedMapping, setCurrentMatchedMapping] = useState<MaterialSpoolMapping | null>(mockSpoolSNMappings[0]);
  const [scanFeedback, setScanFeedback] = useState<{ type: 'success' | 'warn' | 'info'; text: string }>({
    type: 'success',
    text: '已自动识别盘具号 P001-123，带出物料【聚酯亚胺漆包圆铜线 QZY-2/180】并匹配巡检方案《QZY-2/180 聚酯亚胺漆包铜圆线-巡回检验标准方案》！'
  });

  // Scheme Inspection Modal State
  const [showSchemeInspectModal, setShowSchemeInspectModal] = useState<boolean>(false);
  const [schemeValues, setSchemeValues] = useState<Record<string, string>>({});
  const [schemeInspector, setSchemeInspector] = useState<string>('杨灵利');
  const [schemeAutoNCR, setSchemeAutoNCR] = useState<boolean>(true);

  // Active Scheme Memo
  const activeScheme: InspectionScheme = useMemo(() => {
    if (currentMatchedMapping && mockInspectionSchemes[currentMatchedMapping.schemeId]) {
      return mockInspectionSchemes[currentMatchedMapping.schemeId];
    }
    return mockInspectionSchemes['FA-QZY-180-01'];
  }, [currentMatchedMapping]);

  // Scan execution handler
  const handleExecuteScan = (codeToScan?: string) => {
    const raw = (codeToScan !== undefined ? codeToScan : scanInput).trim();
    if (!raw) {
      setScanFeedback({ type: 'warn', text: '请输入或使用扫码枪扫描盘具号条码或物料SN条码！' });
      return;
    }

    // Try finding in mock mappings
    const match = mockSpoolSNMappings.find(m => 
      m.spoolNo.toLowerCase() === raw.toLowerCase() ||
      m.materialSN.toLowerCase() === raw.toLowerCase() ||
      raw.toLowerCase().includes(m.spoolNo.toLowerCase()) ||
      raw.toLowerCase().includes(m.materialSN.toLowerCase())
    );

    if (match) {
      setCurrentMatchedMapping(match);
      setScanInput(raw);
      const isSpool = raw.toLowerCase().includes(match.spoolNo.toLowerCase());
      const scheme = mockInspectionSchemes[match.schemeId];
      setScanFeedback({
        type: 'success',
        text: `扫码成功！通过扫描${isSpool ? '【盘具号: ' + match.spoolNo + '】' : '【物料SN码: ' + match.materialSN + '】'}，已带出物料【${match.materialName} (规格:${match.spec})】，已自动匹配对应巡检方案【${scheme?.schemeName || match.schemeId}】！`
      });
    } else {
      // Dynamic fallback mapping
      const isSpoolLike = raw.startsWith('P') || raw.includes('-');
      const dynamicMapping: MaterialSpoolMapping = {
        spoolNo: isSpoolLike ? raw : `P-${raw.slice(-6)}`,
        materialSN: isSpoolLike ? `SN20261022-${raw.replace(/[^0-9]/g, '').slice(-4) || '9999'}` : raw,
        orderNo: 'PG20260400047',
        materialCode: 'WL-2026-QZY180',
        materialName: '聚酯亚胺漆包圆铜线 QZY-2/180',
        spec: 'Φ 1.250mm (2级漆膜)',
        process: '漆包',
        machineId: 'QB-01 (1号立式高速漆包机)',
        batchNo: 'BAT-20261022-SCAN',
        operator: '杨灵利',
        schemeId: 'FA-QZY-180-01'
      };
      setCurrentMatchedMapping(dynamicMapping);
      setScanInput(raw);
      setScanFeedback({
        type: 'info',
        text: `已识别条码【${raw}】，已自动关联物料【${dynamicMapping.materialName}】并加载对应漆包巡检方案《QZY-2/180 聚酯亚胺漆包铜圆线-巡回检验标准方案》！`
      });
    }
  };

  // Open scheme inspection modal and initialize values
  const handleOpenSchemeInspectModal = () => {
    const initial: Record<string, string> = {};
    activeScheme.items.forEach(item => {
      initial[item.id] = item.defaultValue;
    });
    setSchemeValues(initial);
    setShowSchemeInspectModal(true);
  };

  // Helper to validate single item in scheme
  const checkItemResult = (item: SchemeInspectionItem, valStr: string): { pass: boolean; desc: string; diff?: number } => {
    if (!valStr || !valStr.trim()) {
      return { pass: false, desc: '未录入实测值' };
    }
    const cleanStr = valStr.trim();

    // Check textual values
    if (cleanStr.includes('不合格') || cleanStr.includes('开裂') || cleanStr.includes('起泡') || cleanStr.includes('超标') || cleanStr.includes('氧化')) {
      return { pass: false, desc: '不符合标准规范' };
    }
    if (cleanStr.includes('合格') || cleanStr.includes('无裂纹') || cleanStr.includes('光洁')) {
      return { pass: true, desc: '合格 (符合规程)' };
    }

    // Try numeric evaluation
    const numMatch = cleanStr.match(/[-+]?[0-9]*\.?[0-9]+/);
    if (numMatch) {
      const num = parseFloat(numMatch[0]);
      if (!isNaN(num)) {
        if (item.min !== undefined && num < item.min) {
          const diff = Number((item.min - num).toFixed(4));
          return { pass: false, desc: `超下限 -${diff} ${item.unit}`, diff };
        }
        if (item.max !== undefined && num > item.max) {
          const diff = Number((num - item.max).toFixed(4));
          return { pass: false, desc: `超上限 +${diff} ${item.unit}`, diff };
        }
        return { pass: true, desc: `在控合格 (${num} ${item.unit})` };
      }
    }

    return { pass: true, desc: '合格' };
  };

  // Batch Save Scheme Inspection
  const handleSaveSchemeInspection = () => {
    if (!currentMatchedMapping) return;

    const nowStr = new Date().toISOString().replace('T', ' ').slice(0, 19);
    const datePrefix = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    
    // Evaluate all items
    const evaluationList = activeScheme.items.map(item => {
      const val = schemeValues[item.id] || item.defaultValue;
      const evalRes = checkItemResult(item, val);
      return {
        item,
        val,
        pass: evalRes.pass,
        desc: evalRes.desc
      };
    });

    const failedItems = evaluationList.filter(e => !e.pass);
    const hasFail = failedItems.length > 0;
    let createdNcrId: string | undefined = undefined;

    // If unqualified, create NCR record automatically if checked
    if (hasFail && schemeAutoNCR) {
      createdNcrId = `NCR-${datePrefix}-${(ncrs.length + 1).toString().padStart(3, '0')}`;
      const failSummary = failedItems.map(f => `${f.item.name}: 实测${f.val} (${f.desc})`).join('；');
      const failReason = `依据巡检方案【${activeScheme.schemeName}】巡检，工序【${currentMatchedMapping.process}】机台【${currentMatchedMapping.machineId}】检测发现：${failSummary}，超出技术规程公差要求。`;
      
      const newNCR: NCRRecord = {
        id: createdNcrId,
        sourceRecordId: `方案检验: ${activeScheme.schemeId}`,
        orderNo: currentMatchedMapping.orderNo,
        process: currentMatchedMapping.process,
        item: `巡检方案【${activeScheme.schemeName}】共 ${failedItems.length} 项超差`,
        defectType: '工艺不合格', // Process defect
        defectReason: failReason,
        action: `对盘具【${currentMatchedMapping.spoolNo}】（SN:${currentMatchedMapping.materialSN}）贴黄色待检隔离标签；通知工艺工程师现场复调工艺参数。`,
        result: '待组织OA评审与工艺整改措施复核。',
        oaStatus: '未发起',
        createTime: nowStr,
        creator: schemeInspector
      };

      // Automatically generate a process rectification requirement for process defect
      const newPrId = `PR-${datePrefix}-${(rectifications.length + 1).toString().padStart(2, '0')}`;
      newNCR.rectificationId = newPrId;

      const newPR: ProcessRectificationRecord = {
        id: newPrId,
        ncrId: createdNcrId,
        orderNo: currentMatchedMapping.orderNo,
        process: currentMatchedMapping.process,
        requirement: `【工艺整改要求】：针对工单${currentMatchedMapping.orderNo}在${currentMatchedMapping.process}工序巡检发现的${failedItems.map(f => f.item.name).join('、')}超差：1. 立即检查校核机台工艺设定温度、涂覆模具或拉伸倍率；2. 现场分析根因并调整工艺SOP；3. 试样复验合格后方可恢复量产。`,
        engineer: '邓工 (高级工艺工程师)',
        deadline: new Date(Date.now() + 86400000 * 2).toISOString().slice(0, 10) + ' 18:00',
        preventiveAction: '已对该工序关键控制点列入重点点巡检名录，增设工艺防错预警机制。',
        verificationResult: '整改措施推进中，待工艺复核取样验证',
        status: '整改中',
        createTime: nowStr
      };

      setNcrs(prev => [newNCR, ...prev]);
      setRectifications(prev => [newPR, ...prev]);
    }

    // Generate individual PatrolInspectionRecord for each scheme item
    const newRecordsList: PatrolInspectionRecord[] = evaluationList.map((evalItem, idx) => {
      const recId = `XC-${datePrefix}-${(records.length + idx + 1).toString().padStart(3, '0')}`;
      return {
        id: recId,
        orderNo: currentMatchedMapping.orderNo,
        process: currentMatchedMapping.process,
        item: evalItem.item.name,
        standard: evalItem.item.standard,
        measuredValue: `${evalItem.val}${evalItem.item.unit ? ' ' + evalItem.item.unit : ''} ${!evalItem.pass ? '(' + evalItem.desc + ')' : ''}`,
        result: evalItem.pass ? '合格' : '不合格',
        inspector: schemeInspector,
        inspectTime: nowStr,
        machineId: currentMatchedMapping.machineId,
        spoolNo: currentMatchedMapping.spoolNo,
        materialSN: currentMatchedMapping.materialSN,
        schemeId: activeScheme.schemeId,
        ncrId: !evalItem.pass ? createdNcrId : undefined
      };
    });

    setRecords(prev => [...newRecordsList, ...prev]);
    setShowSchemeInspectModal(false);

    if (hasFail) {
      alert(`【依据巡检方案质检完成】\n` +
            `受检物料: ${currentMatchedMapping.materialName}\n` +
            `盘具号: ${currentMatchedMapping.spoolNo} | SN: ${currentMatchedMapping.materialSN}\n` +
            `方案规程: ${activeScheme.schemeName}\n` +
            `检验结果: 共检测 ${activeScheme.items.length} 项，其中 ${failedItems.length} 项超差【不合格】！\n\n` +
            `★ 系统已联动生成不合格品处理单: ${createdNcrId}\n` +
            `★ 已自动针对工艺不合格下达【工艺整改要求单】！\n` +
            `您可在“不合格处理(NCR)”或“工艺整改记录”标签页进行OA流转与整改闭环！`);
      setActiveTab('ncr');
    } else {
      alert(`【依据巡检方案质检完成】\n` +
            `受检物料: ${currentMatchedMapping.materialName}\n` +
            `盘具号: ${currentMatchedMapping.spoolNo} | SN: ${currentMatchedMapping.materialSN}\n` +
            `方案规程: ${activeScheme.schemeName}\n` +
            `检验结果: 全套 ${activeScheme.items.length} 个技术指标全部【合格】！\n` +
            `过程检验数据已成功归档到系统台账。`);
    }
  };

  // Preset inspection items definitions
  const itemPresets = [
    { name: '线径外径', standard: '1.250 ± 0.008 mm', process: '漆包' },
    { name: '漆膜厚度', standard: '≥ 0.040 mm', process: '漆包' },
    { name: '软化击穿温度', standard: '≥ 450.0 ℃', process: '涂漆' },
    { name: '高压针孔', standard: '≤ 2 个 / 5m', process: '漆包' },
    { name: '延伸率', standard: '≥ 32.0 %', process: '拉丝' },
    { name: '回弹性', standard: '≤ 5.0 °', process: '漆包' },
    { name: '附着力', standard: '1D圆棒卷绕无裂纹', process: '漆包' },
    { name: '表面光洁度与节距', standard: '表面平整无划伤, 节距35±2mm', process: '绞线' },
  ];

  const handleItemSelect = (itemName: string) => {
    setNewItem(itemName);
    const found = itemPresets.find(p => p.name === itemName);
    if (found) {
      setNewStandard(found.standard);
      setNewProcess(found.process);
    }
  };

  // Submit New Inspection Record
  const handleSaveRecord = () => {
    if (!newMeasuredValue.trim()) {
      alert('请填写检验实测值！');
      return;
    }

    const newId = `XC-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${(records.length + 1).toString().padStart(3, '0')}`;
    const nowStr = new Date().toISOString().replace('T', ' ').slice(0, 19);

    let createdNcrId: string | undefined = undefined;

    // If unqualified and auto create NCR
    if (newResult === '不合格' && autoCreateNCR) {
      createdNcrId = `NCR-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${(ncrs.length + 1).toString().padStart(3, '0')}`;
      const newNCR: NCRRecord = {
        id: createdNcrId,
        sourceRecordId: newId,
        orderNo: newOrderNo,
        process: newProcess,
        item: `${newItem} (实测值: ${newMeasuredValue})`,
        defectType: '工艺不合格', // Default to process defect to trigger workflow
        defectReason: `巡回检验在【${newProcess}】工序检测【${newItem}】实测值为 ${newMeasuredValue}，超出标准要求（${newStandard}）。`,
        action: '已对当班此批次在制品贴黄色隔离标签，要求工艺人员及班长现场复查。',
        result: '待组织评审并制定整改方案。',
        oaStatus: '未发起',
        createTime: nowStr,
        creator: newInspector
      };
      setNcrs(prev => [newNCR, ...prev]);
    }

    const newRec: PatrolInspectionRecord = {
      id: newId,
      orderNo: newOrderNo,
      process: newProcess,
      item: newItem,
      standard: newStandard,
      measuredValue: newMeasuredValue,
      result: newResult,
      inspector: newInspector,
      inspectTime: nowStr,
      machineId: newMachineId,
      spoolNo: newSpoolNo,
      ncrId: createdNcrId
    };

    setRecords(prev => [newRec, ...prev]);
    setShowAddRecordModal(false);
    setNewMeasuredValue('');

    if (newResult === '不合格' && autoCreateNCR) {
      alert(`【过程检验已保存】\n判定结果：不合格！\n已自动为您创建不合格NCR单：${createdNcrId}。\n若为工艺不合格，请在NCR模块发起工艺整改要求与OA评审！`);
      setActiveTab('ncr');
    } else {
      alert(`【过程检验数据保存成功】\n单号: ${newId}\n工单: ${newOrderNo}\n判定: ${newResult}`);
    }
  };

  // Submit OA Review
  const handleSubmitOA = () => {
    if (!showOAModal) return;
    const flowId = `OA-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(1000 + Math.random() * 9000)}`;
    setNcrs(prev => prev.map(n => n.id === showOAModal.id ? {
      ...n,
      oaStatus: 'OA评审中',
      oaFlowId: flowId,
      oaReviewer: `${oaReviewDept} (联合审批中)`,
      oaSuggestion: oaSuggestionInput || '提请OA评审：同意返工处理措施，严格复验后方可放行。'
    } : n));

    alert(`【OA评审已成功发起】\nOA流水单号: ${flowId}\nNCR单号: ${showOAModal.id}\n审批部门: ${oaReviewDept}\n紧急度: ${oaUrgency}\nOA评审单已推送至质量经理与工艺总监待办工作流！`);
    setShowOAModal(null);
  };

  // Submit Rectification Request
  const handleSubmitRectification = () => {
    if (!showRectificationModal && !showNewManualPRModal) return;

    const sourceNcr = showRectificationModal;
    const ncrId = sourceNcr ? sourceNcr.id : 'NCR-20261022-002';
    const orderNo = sourceNcr ? sourceNcr.orderNo : 'PG20260400050';
    const process = sourceNcr ? sourceNcr.process : '漆包';

    if (!prRequirement.trim()) {
      alert('请填写具体的工艺整改要求！');
      return;
    }

    const newPrId = `PR-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${(rectifications.length + 1).toString().padStart(2, '0')}`;
    const nowStr = new Date().toISOString().replace('T', ' ').slice(0, 19);

    const newPR: ProcessRectificationRecord = {
      id: newPrId,
      ncrId: ncrId,
      orderNo: orderNo,
      process: process,
      requirement: prRequirement,
      engineer: prEngineer,
      deadline: prDeadline,
      preventiveAction: prPreventiveAction || '待责任工程师制定预防与纠正措施',
      verificationResult: '整改措施实施中，待现场复核验证',
      status: '整改中',
      createTime: nowStr
    };

    setRectifications(prev => [newPR, ...prev]);

    // Update NCR relation
    if (sourceNcr) {
      setNcrs(prev => prev.map(n => n.id === sourceNcr.id ? { ...n, rectificationId: newPrId } : n));
    }

    alert(`【工艺整改记录已下发】\n工艺整改单号: ${newPrId}\n责任工程师: ${prEngineer}\n完成时限: ${prDeadline}\n整改要求已下发至工艺技术部！`);
    setShowRectificationModal(null);
    setShowNewManualPRModal(false);
    setPrRequirement('');
    setPrPreventiveAction('');
    setActiveTab('rectification');
  };

  // Submit Verification Close
  const handleVerifyClose = () => {
    if (!showVerifyModal) return;
    if (!verifyConclusion.trim()) {
      alert('请填写工艺整改复核验证结论！');
      return;
    }

    setRectifications(prev => prev.map(p => p.id === showVerifyModal.id ? {
      ...p,
      verificationResult: verifyConclusion,
      status: '已闭环'
    } : p));

    alert(`【工艺整改闭环成功】\n整改单: ${showVerifyModal.id}\n验证结果已归档！`);
    setShowVerifyModal(null);
    setVerifyConclusion('');
  };

  return (
    <div className="flex flex-col h-full bg-[#f4f6f8] font-sans">
      {/* Top Header */}
      <div className="bg-[#1e3b5f] text-white px-5 py-3 flex items-center justify-between shadow-md shrink-0">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded bg-[#1976d2] flex items-center justify-center font-bold text-white shadow-inner">
            <FileCheck size={20} />
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-wider flex items-center space-x-2">
              <span>车间巡回检验系统</span>
              <span className="text-xs font-normal text-blue-200 bg-white/10 px-2 py-0.5 rounded">Patrol Inspection Terminal</span>
            </h1>
            <p className="text-xs text-blue-200">过程检验数据采集 · 不合格NCR闭环处理 · OA评审流协同 · 工艺整改记录跟踪</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-right text-xs text-gray-300">
            <div>工位机: <span className="text-white font-mono font-bold">QB001-线上</span></div>
            <div>检验员: <span className="text-white font-bold">杨灵利 (质检组)</span></div>
          </div>
          <button 
            onClick={onBack}
            className="bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-1.5 rounded text-sm text-white font-medium flex items-center space-x-1 transition-colors"
          >
            <ArrowLeft size={16} />
            <span>返回工作台</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white px-6 border-b border-gray-200 flex items-center justify-between shrink-0">
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab('records')}
            className={`py-3 px-5 font-bold text-sm border-b-2 flex items-center space-x-2 transition-all ${
              activeTab === 'records'
                ? 'border-[#1976d2] text-[#1976d2] bg-blue-50/40'
                : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <ListChecks size={18} />
            <span>过程检验记录 (Inspection Records)</span>
            <span className="ml-1.5 px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-800 font-mono font-bold">
              {records.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('ncr')}
            className={`py-3 px-5 font-bold text-sm border-b-2 flex items-center space-x-2 transition-all ${
              activeTab === 'ncr'
                ? 'border-[#ff6d00] text-[#e65100] bg-amber-50/40'
                : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <AlertTriangle size={18} />
            <span>不合格处理 (NCR & OA评审)</span>
            <span className="ml-1.5 px-2 py-0.5 text-xs rounded-full bg-amber-100 text-amber-800 font-mono font-bold">
              {ncrs.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('rectification')}
            className={`py-3 px-5 font-bold text-sm border-b-2 flex items-center space-x-2 transition-all ${
              activeTab === 'rectification'
                ? 'border-emerald-600 text-emerald-700 bg-emerald-50/40'
                : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <Wrench size={18} />
            <span>工艺整改记录 (Process Rectification)</span>
            <span className="ml-1.5 px-2 py-0.5 text-xs rounded-full bg-emerald-100 text-emerald-800 font-mono font-bold">
              {rectifications.length}
            </span>
          </button>
        </div>

        {/* Action button corresponding to active tab */}
        <div className="flex items-center space-x-3">
          {activeTab === 'records' && (
            <>
              <button
                onClick={handleOpenSchemeInspectModal}
                className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 hover:from-blue-800 hover:to-indigo-900 text-white px-4 py-1.5 rounded text-sm font-bold flex items-center space-x-2 shadow-sm transition-all ring-2 ring-blue-300"
              >
                <ScanLine size={16} />
                <span>依据巡检方案质检</span>
              </button>
              <button
                onClick={() => setShowAddRecordModal(true)}
                className="bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 px-3.5 py-1.5 rounded text-sm font-semibold flex items-center space-x-1.5 shadow-sm transition-colors"
              >
                <Plus size={15} />
                <span>单项录入</span>
              </button>
            </>
          )}

          {activeTab === 'ncr' && (
            <button
              onClick={() => {
                setShowAddRecordModal(true);
                setNewResult('不合格');
              }}
              className="bg-[#ff6d00] hover:bg-[#e65100] text-white px-4 py-1.5 rounded text-sm font-bold flex items-center space-x-1.5 shadow-sm transition-colors"
            >
              <Plus size={16} />
              <span>新增不合格项并登记NCR</span>
            </button>
          )}

          {activeTab === 'rectification' && (
            <button
              onClick={() => {
                setShowNewManualPRModal(true);
                setPrRequirement('');
                setPrPreventiveAction('');
              }}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-1.5 rounded text-sm font-bold flex items-center space-x-1.5 shadow-sm transition-colors"
            >
              <Plus size={16} />
              <span>发起工艺整改记录</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Tab View Contents */}
      <div className="flex-1 overflow-auto p-4">
        {/* ===================== TAB 1: 过程检验记录 ===================== */}
        {activeTab === 'records' && (
          <div className="flex flex-col space-y-4">
            
            {/* ====== 巡检扫码工作台: 扫描盘具号 / 物料SN码带出物料与巡检方案 ====== */}
            <div className="bg-gradient-to-br from-white via-blue-50/20 to-slate-50 border border-blue-200 rounded-lg shadow-sm p-4 text-xs">
              <div className="flex flex-wrap items-center justify-between pb-3 border-b border-gray-200 gap-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-7 h-7 rounded bg-blue-600 text-white flex items-center justify-center shadow-sm">
                    <ScanLine size={16} />
                  </div>
                  <div>
                    <h2 className="font-bold text-sm text-gray-800 flex items-center space-x-2">
                      <span>巡检扫码工作台 (盘具号 / 物料SN条码识别)</span>
                      <span className="text-[10px] bg-blue-100 text-blue-700 font-normal px-2 py-0.5 rounded-full font-mono">
                        Auto-Scheme Linkage
                      </span>
                    </h2>
                    <p className="text-[11px] text-gray-500">
                      扫描盘具号带出物料信息并匹配巡检方案，或扫描物料SN码检索对应巡检方案，依据方案技术指标进行质检
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>激光扫描枪就绪 (Ready)</span>
                  </span>
                </div>
              </div>

              {/* 扫码输入交互栏 */}
              <div className="mt-3 grid grid-cols-1 lg:grid-cols-12 gap-3 items-center">
                <div className="lg:col-span-8 flex flex-wrap items-center gap-2">
                  <div className="inline-flex rounded border border-gray-300 bg-white p-0.5 text-[11px] font-bold">
                    <button
                      type="button"
                      onClick={() => setScanType('all')}
                      className={`px-2.5 py-1 rounded transition-colors ${
                        scanType === 'all' ? 'bg-[#1e3b5f] text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      全部智能识别
                    </button>
                    <button
                      type="button"
                      onClick={() => setScanType('spool')}
                      className={`px-2.5 py-1 rounded transition-colors ${
                        scanType === 'spool' ? 'bg-blue-600 text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      扫描盘具号 (Spool)
                    </button>
                    <button
                      type="button"
                      onClick={() => setScanType('sn')}
                      className={`px-2.5 py-1 rounded transition-colors ${
                        scanType === 'sn' ? 'bg-indigo-600 text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      扫描物料SN码 (Barcode)
                    </button>
                  </div>

                  <div className="flex-1 min-w-[240px] flex items-center space-x-1.5 bg-white border-2 border-blue-400 rounded px-3 py-1.5 focus-within:ring-2 focus-within:ring-blue-300 shadow-inner">
                    <Barcode size={18} className="text-blue-600 shrink-0" />
                    <input
                      type="text"
                      value={scanInput}
                      onChange={(e) => setScanInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleExecuteScan();
                        }
                      }}
                      placeholder={
                        scanType === 'spool' 
                          ? '请扫码或输入盘具编号 (如 P001-123)...' 
                          : scanType === 'sn' 
                          ? '请扫码或输入物料SN码 (如 2604046902001019)...' 
                          : '扫描盘具号(P001-...)或物料SN条码...'
                      }
                      className="w-full bg-transparent font-mono font-bold text-gray-900 text-xs outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => handleExecuteScan()}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs font-bold transition-colors shrink-0 shadow-xs"
                    >
                      识别寻检
                    </button>
                  </div>
                </div>

                {/* 快速扫码模拟器徽章 */}
                <div className="lg:col-span-4 flex flex-wrap items-center gap-1.5 text-[11px]">
                  <span className="text-gray-500 font-medium">快速模拟扫码:</span>
                  <button
                    type="button"
                    onClick={() => handleExecuteScan('P001-123')}
                    className="px-2 py-0.5 rounded bg-blue-100 hover:bg-blue-200 text-blue-800 font-mono border border-blue-300 font-bold"
                    title="扫描盘具号 P001-123 (带出聚酯亚胺1.25mm)"
                  >
                    盘具 P001-123
                  </button>
                  <button
                    type="button"
                    onClick={() => handleExecuteScan('2604046902001019')}
                    className="px-2 py-0.5 rounded bg-indigo-100 hover:bg-indigo-200 text-indigo-800 font-mono border border-indigo-300 font-bold"
                    title="扫描物料SN条码 2604046902001019"
                  >
                    SN码 2604...1019
                  </button>
                  <button
                    type="button"
                    onClick={() => handleExecuteScan('P001-124')}
                    className="px-2 py-0.5 rounded bg-amber-100 hover:bg-amber-200 text-amber-800 font-mono border border-amber-300 font-bold"
                    title="扫描盘具号 P001-124 (带出缩醛漆包线)"
                  >
                    盘具 P001-124
                  </button>
                  <button
                    type="button"
                    onClick={() => handleExecuteScan('2604046902008888')}
                    className="px-2 py-0.5 rounded bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-mono border border-emerald-300 font-bold"
                    title="扫描裸铜线SN码 2604046902008888"
                  >
                    SN码 ...8888 (裸铜)
                  </button>
                </div>
              </div>

              {/* 扫码状态通知栏 */}
              {scanFeedback && (
                <div className={`mt-2.5 px-3 py-1.5 rounded flex items-center space-x-2 text-xs border ${
                  scanFeedback.type === 'success' 
                    ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                    : scanFeedback.type === 'warn'
                    ? 'bg-amber-50 text-amber-900 border-amber-200'
                    : 'bg-blue-50 text-blue-900 border-blue-200'
                }`}>
                  <CheckCircle2 size={14} className={scanFeedback.type === 'success' ? 'text-emerald-600' : 'text-blue-600'} />
                  <span className="font-medium">{scanFeedback.text}</span>
                </div>
              )}

              {/* 带出的物料信息与匹配巡检方案卡片 */}
              {currentMatchedMapping && (
                <div className="mt-3.5 grid grid-cols-1 md:grid-cols-12 gap-3.5">
                  {/* 左侧：扫码带出的物料档案信息 */}
                  <div className="md:col-span-6 bg-white p-3.5 rounded-lg border border-blue-200/80 shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between pb-2 border-b border-gray-100 mb-2.5">
                        <span className="font-bold text-gray-800 flex items-center space-x-1.5">
                          <Package size={15} className="text-blue-600" />
                          <span>已识别受检物料与派工单信息</span>
                        </span>
                        <div className="flex items-center space-x-1.5">
                          <span className="bg-blue-100 text-blue-800 text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                            盘具号: {currentMatchedMapping.spoolNo}
                          </span>
                          <span className="bg-indigo-100 text-indigo-800 text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                            SN: {currentMatchedMapping.materialSN}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1.5 text-xs">
                        <div className="flex items-baseline">
                          <span className="text-gray-400 w-18 shrink-0">物料名称:</span>
                          <span className="font-bold text-gray-900 text-sm">{currentMatchedMapping.materialName}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-gray-400 w-18 shrink-0">规格型号:</span>
                          <span className="font-bold font-mono text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                            {currentMatchedMapping.spec}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 pt-1">
                          <div>
                            <span className="text-gray-400">派工单号: </span>
                            <span className="font-mono font-bold text-gray-800">{currentMatchedMapping.orderNo}</span>
                          </div>
                          <div>
                            <span className="text-gray-400">生产工序: </span>
                            <span className="font-bold text-emerald-700">{currentMatchedMapping.process}工序</span>
                          </div>
                          <div>
                            <span className="text-gray-400">机台设备: </span>
                            <span className="font-mono text-gray-700">{currentMatchedMapping.machineId}</span>
                          </div>
                          <div>
                            <span className="text-gray-400">生产批次: </span>
                            <span className="font-mono text-gray-700">{currentMatchedMapping.batchNo}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
                      <span>当班操作工: <strong className="text-gray-700">{currentMatchedMapping.operator}</strong></span>
                      <span className="font-mono">物料编码: {currentMatchedMapping.materialCode}</span>
                    </div>
                  </div>

                  {/* 右侧：自动匹配到的巡检方案 */}
                  <div className="md:col-span-6 bg-gradient-to-br from-indigo-50/50 via-white to-blue-50/60 p-3.5 rounded-lg border-2 border-indigo-300/80 shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between pb-2 border-b border-indigo-100 mb-2.5">
                        <span className="font-bold text-indigo-950 flex items-center space-x-1.5">
                          <FileCheck size={16} className="text-indigo-600" />
                          <span>对应过程巡检方案 (Inspection Scheme)</span>
                        </span>
                        <span className="bg-indigo-600 text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded shadow-xs">
                          {activeScheme.schemeId}
                        </span>
                      </div>

                      <div className="text-xs space-y-1.5">
                        <div>
                          <span className="text-gray-500">方案名称: </span>
                          <span className="font-bold text-indigo-900 text-sm">{activeScheme.schemeName}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div>
                            <span className="text-gray-500">规程版本: </span>
                            <span className="font-mono font-bold text-gray-800">{activeScheme.version}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">执行技术标准: </span>
                            <span className="font-mono text-gray-700 text-[11px]">{activeScheme.standardDoc}</span>
                          </div>
                        </div>

                        <div className="mt-2 bg-white/80 rounded p-2 border border-indigo-100">
                          <div className="font-bold text-gray-700 text-[11px] mb-1 flex items-center justify-between">
                            <span>包含标准检验项目与量检具 (共 {activeScheme.items.length} 项):</span>
                            <span className="text-[10px] text-indigo-600 font-normal">依方案闭环控制</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {activeScheme.items.map((item, idx) => (
                              <span 
                                key={item.id} 
                                className="bg-indigo-50 text-indigo-800 px-2 py-0.5 rounded text-[10px] font-medium border border-indigo-200"
                                title={`标准要求: ${item.standard} | 检具: ${item.tool}`}
                              >
                                {idx + 1}. {item.name} ({item.unit || '规程'})
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3.5 pt-2.5 border-t border-indigo-100 flex items-center justify-between">
                      <span className="text-[11px] text-gray-500">
                        依据此方案开展全指标判定，超差自动联动 NCR 与工艺整改
                      </span>
                      <button
                        type="button"
                        onClick={handleOpenSchemeInspectModal}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-1.5 rounded text-xs flex items-center space-x-1.5 shadow-sm transition-all hover:shadow"
                      >
                        <CheckCircle size={14} />
                        <span>依据此方案开始质检</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Filter toolbar */}
            <div className="bg-white p-3.5 rounded border border-gray-200 shadow-sm flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center space-x-2 bg-gray-50 border border-gray-300 rounded px-3 py-1.5 w-64 focus-within:ring-2 focus-within:ring-blue-500">
                <Search size={16} className="text-gray-400" />
                <input 
                  type="text" 
                  placeholder="搜索工单号/检验项目/检验员..." 
                  className="bg-transparent outline-none w-full text-xs"
                  value={searchKey}
                  onChange={(e) => setSearchKey(e.target.value)}
                />
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-gray-500 font-medium text-xs">工序:</span>
                <select 
                  className="border border-gray-300 rounded px-2.5 py-1 text-xs bg-gray-50 outline-none"
                  value={filterProcess}
                  onChange={(e) => setFilterProcess(e.target.value)}
                >
                  <option value="all">全部工序</option>
                  <option value="漆包">漆包</option>
                  <option value="涂漆">涂漆</option>
                  <option value="拉丝">拉丝</option>
                  <option value="绞线">绞线</option>
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-gray-500 font-medium text-xs">判定结果:</span>
                <select 
                  className="border border-gray-300 rounded px-2.5 py-1 text-xs bg-gray-50 outline-none"
                  value={filterResult}
                  onChange={(e) => setFilterResult(e.target.value)}
                >
                  <option value="all">全部判定</option>
                  <option value="合格">合格</option>
                  <option value="不合格">不合格</option>
                </select>
              </div>

              <div className="ml-auto flex items-center space-x-2 text-xs text-gray-500">
                <span>共筛选出 <strong className="text-blue-600 font-mono text-sm">{filteredRecords.length}</strong> 条过程检验数据</span>
              </div>
            </div>

            {/* Records Table */}
            <div className="bg-white rounded border border-gray-200 shadow-sm overflow-hidden">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-[#f8f9fa] border-b border-gray-200 text-gray-700 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-3 w-12 text-center border-r border-gray-200">序号</th>
                    <th className="py-3 px-3 border-r border-gray-200">检验单号</th>
                    <th className="py-3 px-3 border-r border-gray-200">工单号</th>
                    <th className="py-3 px-3 border-r border-gray-200">工序</th>
                    <th className="py-3 px-3 border-r border-gray-200">机台/盘号</th>
                    <th className="py-3 px-3 border-r border-gray-200">检验项目</th>
                    <th className="py-3 px-3 border-r border-gray-200">标准参数要求</th>
                    <th className="py-3 px-3 border-r border-gray-200">实测值</th>
                    <th className="py-3 px-3 border-r border-gray-200 text-center">判定结果</th>
                    <th className="py-3 px-3 border-r border-gray-200">检验员</th>
                    <th className="py-3 px-3 border-r border-gray-200">检验时间</th>
                    <th className="py-3 px-3 text-center">关联操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredRecords.length > 0 ? (
                    filteredRecords.map((rec, index) => (
                      <tr key={rec.id} className="hover:bg-blue-50/40 transition-colors">
                        <td className="py-3 px-3 text-center text-gray-500 font-mono border-r border-gray-200">
                          {index + 1}
                        </td>
                        <td className="py-3 px-3 font-mono font-bold text-gray-800 border-r border-gray-200">
                          {rec.id}
                        </td>
                        <td className="py-3 px-3 font-mono font-bold text-blue-700 border-r border-gray-200">
                          {rec.orderNo}
                        </td>
                        <td className="py-3 px-3 font-semibold text-gray-700 border-r border-gray-200">
                          <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-800 text-[11px] border border-gray-200">
                            {rec.process}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-gray-600 font-mono border-r border-gray-200">
                          <div className="font-medium text-gray-800 text-[11px]">{rec.machineId}</div>
                          <div className="text-[10px] text-blue-700 font-semibold flex items-center space-x-1">
                            <span>盘: {rec.spoolNo}</span>
                            {rec.materialSN && <span className="text-gray-400">| SN: {rec.materialSN.slice(-4)}</span>}
                          </div>
                          {rec.schemeId && (
                            <div className="text-[9px] text-indigo-700 bg-indigo-50 px-1 py-0.5 rounded border border-indigo-200 mt-0.5 inline-block">
                              方案: {rec.schemeId}
                            </div>
                          )}
                        </td>
                        <td className="py-3 px-3 font-bold text-gray-800 border-r border-gray-200">
                          {rec.item}
                        </td>
                        <td className="py-3 px-3 text-gray-600 font-mono border-r border-gray-200">
                          {rec.standard}
                        </td>
                        <td className="py-3 px-3 font-mono font-bold border-r border-gray-200">
                          <span className={rec.result === '不合格' ? 'text-red-600 bg-red-50 px-1 py-0.5 rounded border border-red-200' : 'text-gray-900'}>
                            {rec.measuredValue}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-center border-r border-gray-200">
                          {rec.result === '合格' ? (
                            <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                              <CheckCircle2 size={13} />
                              <span>合格</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300 animate-pulse">
                              <XCircle size={13} />
                              <span>不合格</span>
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-3 text-gray-700 border-r border-gray-200">
                          <div className="flex items-center space-x-1">
                            <User size={13} className="text-gray-400" />
                            <span>{rec.inspector}</span>
                          </div>
                        </td>
                        <td className="py-3 px-3 text-gray-500 font-mono border-r border-gray-200">
                          {rec.inspectTime}
                        </td>
                        <td className="py-3 px-3 text-center">
                          {rec.result === '不合格' ? (
                            rec.ncrId ? (
                              <button
                                onClick={() => setActiveTab('ncr')}
                                className="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-800 rounded text-xs font-bold transition-colors inline-flex items-center space-x-1"
                              >
                                <span>查看NCR: {rec.ncrId}</span>
                              </button>
                            ) : (
                              <button
                                onClick={() => {
                                  const ncrId = `NCR-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${(ncrs.length + 1).toString().padStart(3, '0')}`;
                                  const newNCR: NCRRecord = {
                                    id: ncrId,
                                    sourceRecordId: rec.id,
                                    orderNo: rec.orderNo,
                                    process: rec.process,
                                    item: `${rec.item} (实测: ${rec.measuredValue})`,
                                    defectType: '工艺不合格',
                                    defectReason: `巡检发现【${rec.process}】工序【${rec.item}】实测值为 ${rec.measuredValue}，超出标准公差（${rec.standard}）。`,
                                    action: '已就地隔离，调取当前工艺参数，报质检主管与工艺工程师现场评审。',
                                    result: '隔离待评审处置',
                                    oaStatus: '未发起',
                                    createTime: new Date().toISOString().replace('T', ' ').slice(0, 19),
                                    creator: rec.inspector
                                  };
                                  setNcrs(prev => [newNCR, ...prev]);
                                  setRecords(prev => prev.map(r => r.id === rec.id ? { ...r, ncrId } : r));
                                  alert(`已针对此不合格记录生成 NCR 处理单: ${ncrId}！`);
                                  setActiveTab('ncr');
                                }}
                                className="px-2.5 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded text-xs font-bold transition-colors shadow-sm inline-flex items-center space-x-1"
                              >
                                <AlertTriangle size={12} />
                                <span>发起NCR处理</span>
                              </button>
                            )
                          ) : (
                            <span className="text-gray-400 text-xs">—</span>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={12} className="py-12 text-center text-gray-400">
                        暂无符合筛选条件的过程检验记录
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ===================== TAB 2: 不合格处理 (NCR & OA评审) ===================== */}
        {activeTab === 'ncr' && (
          <div className="flex flex-col space-y-4">
            {/* Guide Info */}
            <div className="bg-amber-50 border-l-4 border-amber-500 p-3 rounded-r flex items-center justify-between text-xs text-amber-900 shadow-sm">
              <div className="flex items-center space-x-2">
                <AlertOctagon size={18} className="text-amber-600 shrink-0" />
                <span>
                  <strong>不合格品处理规范 (NCR)：</strong> 
                  所有过程检验不合格均在此进行根因剖析、处置措施制定与闭环；支持一键发起<strong>OA办公协同联合评审</strong>。
                  <span className="text-red-700 font-bold ml-1 underline">特别注意：若不合格类别判定为【工艺不合格】，必须下发【工艺整改要求】并发起【工艺整改记录】！</span>
                </span>
              </div>
            </div>

            {/* NCR Cards Grid */}
            <div className="space-y-4">
              {ncrs.map((ncr) => (
                <div 
                  key={ncr.id} 
                  className={`bg-white rounded border shadow-sm p-5 transition-all ${
                    ncr.defectType === '工艺不合格' ? 'border-amber-300 ring-1 ring-amber-100' : 'border-gray-200'
                  }`}
                >
                  {/* Card Header */}
                  <div className="flex flex-wrap items-center justify-between pb-3 border-b border-gray-200 gap-y-2">
                    <div className="flex items-center space-x-3">
                      <span className="font-mono font-bold text-base text-[#1e3b5f] bg-gray-100 px-2.5 py-1 rounded border border-gray-300">
                        {ncr.id}
                      </span>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">工单号:</span>
                        <span className="font-mono font-bold text-blue-700 text-sm">{ncr.orderNo}</span>
                      </div>
                      <span className="text-xs px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200 font-medium">
                        工序: {ncr.process}
                      </span>
                      <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${
                        ncr.defectType === '工艺不合格' 
                          ? 'bg-rose-100 text-rose-800 border-rose-300' 
                          : 'bg-gray-100 text-gray-700 border-gray-300'
                      }`}>
                        类型: {ncr.defectType}
                      </span>
                    </div>

                    {/* OA status pill */}
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1.5 text-xs">
                        <span className="text-gray-500">OA评审状态:</span>
                        <span className={`px-2 py-0.5 rounded font-bold text-xs ${
                          ncr.oaStatus === 'OA评审中' 
                            ? 'bg-amber-100 text-amber-800 border border-amber-300 animate-pulse'
                            : ncr.oaStatus === 'OA评审通过'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : 'bg-gray-100 text-gray-600 border border-gray-300'
                        }`}>
                          {ncr.oaStatus}
                        </span>
                      </div>
                      
                      {ncr.oaStatus === '未发起' ? (
                        <button
                          onClick={() => {
                            setShowOAModal(ncr);
                            setOaTitle(`【OA评审】关于工单${ncr.orderNo}(${ncr.process})不合格NCR-${ncr.id}的处置方案评审`);
                            setOaSuggestionInput(ncr.action);
                          }}
                          className="bg-[#1976d2] hover:bg-[#1565c0] text-white px-3 py-1 rounded text-xs font-bold shadow-sm transition-colors flex items-center space-x-1"
                        >
                          <Send size={12} />
                          <span>发起OA评审</span>
                        </button>
                      ) : (
                        <span className="text-xs text-blue-600 font-mono bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                          OA单号: {ncr.oaFlowId}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Body - Problem, Cause, Action, Result */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 text-xs">
                    <div className="bg-gray-50 p-3 rounded border border-gray-200">
                      <div className="font-bold text-gray-700 mb-1 flex items-center">
                        <span className="w-1.5 h-3 bg-blue-600 rounded mr-1.5"></span>
                        不良检验项目
                      </div>
                      <div className="text-gray-900 font-semibold">{ncr.item}</div>
                      <div className="text-[11px] text-gray-400 mt-1">关联来源: {ncr.sourceRecordId}</div>
                    </div>

                    <div className="bg-red-50/50 p-3 rounded border border-red-200">
                      <div className="font-bold text-red-800 mb-1 flex items-center">
                        <span className="w-1.5 h-3 bg-red-600 rounded mr-1.5"></span>
                        不合格根因剖析
                      </div>
                      <div className="text-gray-800 leading-relaxed">{ncr.defectReason}</div>
                    </div>

                    <div className="bg-blue-50/50 p-3 rounded border border-blue-200">
                      <div className="font-bold text-blue-800 mb-1 flex items-center">
                        <span className="w-1.5 h-3 bg-blue-600 rounded mr-1.5"></span>
                        处置纠正措施
                      </div>
                      <div className="text-gray-800 leading-relaxed">{ncr.action}</div>
                    </div>

                    <div className="bg-emerald-50/50 p-3 rounded border border-emerald-200">
                      <div className="font-bold text-emerald-800 mb-1 flex items-center">
                        <span className="w-1.5 h-3 bg-emerald-600 rounded mr-1.5"></span>
                        处理处置结果
                      </div>
                      <div className="text-gray-800 leading-relaxed">{ncr.result}</div>
                    </div>
                  </div>

                  {/* OA review progress detail if active */}
                  {ncr.oaStatus !== '未发起' && (
                    <div className="mt-3 p-3 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 rounded border border-blue-200 text-xs">
                      <div className="flex items-center justify-between text-blue-900 font-semibold mb-1">
                        <span className="flex items-center space-x-1">
                          <CheckCircle2 size={14} className="text-blue-600" />
                          <span>OA评审审批流轨迹 (OA Workflow Track):</span>
                        </span>
                        <span className="text-[11px] font-mono text-gray-500">审批流单号: {ncr.oaFlowId}</span>
                      </div>
                      <div className="text-gray-700 pl-4 border-l-2 border-blue-400 mt-1">
                        <div><strong>会签节点:</strong> {ncr.oaReviewer}</div>
                        <div className="mt-0.5 text-gray-600"><strong>评审意见:</strong> {ncr.oaSuggestion}</div>
                      </div>
                    </div>
                  )}

                  {/* CRITICAL: Process defect rectification linkage */}
                  {ncr.defectType === '工艺不合格' && (
                    <div className="mt-3.5 p-3.5 bg-rose-50/60 border border-rose-300 rounded flex flex-wrap items-center justify-between gap-y-2">
                      <div className="flex items-center space-x-2 text-rose-900">
                        <ShieldAlert size={18} className="text-rose-600 shrink-0" />
                        <div>
                          <span className="font-bold text-xs">【工艺不合格管控要求】：</span>
                          <span className="text-xs text-rose-800">
                            该项判定为工艺不合格，根据质量体系规定，必须明确<strong>工艺整改要求</strong>并正式下发<strong>工艺整改记录</strong>进行防错闭环。
                          </span>
                        </div>
                      </div>

                      <div>
                        {ncr.rectificationId ? (
                          <div className="flex items-center space-x-2">
                            <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-1 rounded border border-emerald-300">
                              ✓ 已发起工艺整改单: {ncr.rectificationId}
                            </span>
                            <button
                              onClick={() => setActiveTab('rectification')}
                              className="px-3 py-1 bg-white hover:bg-gray-100 border border-emerald-400 text-emerald-800 rounded text-xs font-bold transition-colors"
                            >
                              查看整改记录
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              setShowRectificationModal(ncr);
                              setPrRequirement(`针对工单【${ncr.orderNo}】在【${ncr.process}】工序发生的【${ncr.item}】不良：1. 重新校核修正工艺参数设定；2. 强化模具及温控在线点巡检；3. 试样复测合格后闭环。`);
                              setPrPreventiveAction('调整生产操作SOP，组织班组工艺技术交底');
                            }}
                            className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-1.5 rounded text-xs font-bold shadow-sm transition-colors flex items-center space-x-1"
                          >
                            <Wrench size={13} />
                            <span>下达工艺整改要求 (发起工艺整改记录)</span>
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Card Footer Metadata */}
                  <div className="flex justify-between items-center text-[11px] text-gray-400 mt-3 pt-2 border-t border-gray-100">
                    <span>登记人: {ncr.creator} · 登记时间: {ncr.createTime}</span>
                    <span className="font-mono">金杯电工质量安全保证体系</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===================== TAB 3: 工艺整改记录 ===================== */}
        {activeTab === 'rectification' && (
          <div className="flex flex-col space-y-4">
            {/* Guide Info */}
            <div className="bg-emerald-50 border-l-4 border-emerald-500 p-3 rounded-r flex items-center justify-between text-xs text-emerald-900 shadow-sm">
              <div className="flex items-center space-x-2">
                <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
                <span>
                  <strong>工艺整改记录台账 (Process Rectification Records)：</strong> 
                  针对工艺不合格项所制定的工艺整改要求、落实纠正预防措施，并由工艺/质量部门进行复核验证与闭环归档。
                </span>
              </div>
              <button
                onClick={() => {
                  setShowNewManualPRModal(true);
                  setPrRequirement('');
                  setPrPreventiveAction('');
                }}
                className="bg-emerald-700 hover:bg-emerald-800 text-white px-3 py-1 rounded text-xs font-bold transition-colors"
              >
                + 手动新增整改单
              </button>
            </div>

            {/* Rectification List */}
            <div className="space-y-4">
              {rectifications.map((pr) => (
                <div key={pr.id} className="bg-white rounded border border-gray-200 shadow-sm p-5">
                  {/* Top Bar */}
                  <div className="flex flex-wrap items-center justify-between pb-3 border-b border-gray-200 gap-y-2">
                    <div className="flex items-center space-x-3">
                      <span className="font-mono font-bold text-base text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-300">
                        {pr.id}
                      </span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded font-mono border border-gray-300">
                        来源NCR: {pr.ncrId}
                      </span>
                      <span className="text-xs text-blue-700 font-mono font-bold bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                        工单: {pr.orderNo}
                      </span>
                      <span className="text-xs text-gray-700 font-bold">
                        工序: {pr.process}
                      </span>
                    </div>

                    <div className="flex items-center space-x-3">
                      <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${
                        pr.status === '已闭环'
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          : pr.status === '待复核'
                          ? 'bg-blue-100 text-blue-800 border-blue-300'
                          : 'bg-amber-100 text-amber-800 border-amber-300 animate-pulse'
                      }`}>
                        状态: {pr.status}
                      </span>

                      {pr.status !== '已闭环' && (
                        <button
                          onClick={() => {
                            setShowVerifyModal(pr);
                            setVerifyConclusion('经现场取样多轮复测，各项公差及电气物理性能指标均完全符合工艺作业指导书规范，同意整改闭环。');
                          }}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded text-xs font-bold shadow-sm transition-colors flex items-center space-x-1"
                        >
                          <CheckCircle size={13} />
                          <span>复核验证并闭环</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Detail contents */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-xs">
                    {/* Requirement */}
                    <div className="bg-rose-50/60 p-3.5 rounded border border-rose-200">
                      <div className="font-bold text-rose-900 mb-1.5 flex items-center">
                        <span className="w-1.5 h-3 bg-rose-600 rounded mr-1.5"></span>
                        工艺整改要求 (Requirement)
                      </div>
                      <div className="text-gray-800 leading-relaxed font-medium whitespace-pre-line">
                        {pr.requirement}
                      </div>
                      <div className="mt-3 pt-2 border-t border-rose-200/60 flex justify-between items-center text-[11px] text-gray-500">
                        <span>责任工艺工程师: <strong className="text-gray-800">{pr.engineer}</strong></span>
                        <span>整改时限: <strong className="text-rose-700 font-mono">{pr.deadline}</strong></span>
                      </div>
                    </div>

                    {/* Preventive Action & Verification */}
                    <div className="bg-gray-50 p-3.5 rounded border border-gray-200 flex flex-col justify-between">
                      <div>
                        <div className="font-bold text-gray-800 mb-1.5 flex items-center">
                          <span className="w-1.5 h-3 bg-blue-600 rounded mr-1.5"></span>
                          整改与预防措施实施情况
                        </div>
                        <div className="text-gray-700 leading-relaxed">
                          {pr.preventiveAction || '待填报纠正预防措施实施进展...'}
                        </div>
                      </div>

                      <div className="mt-3 pt-2 border-t border-gray-200">
                        <div className="font-bold text-emerald-800 mb-1 flex items-center">
                          <CheckCircle2 size={13} className="mr-1 text-emerald-600" />
                          复核验证结果 (Verification Result)
                        </div>
                        <div className="text-gray-700 font-medium">
                          {pr.verificationResult}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex justify-between items-center text-[11px] text-gray-400 mt-3 pt-2 border-t border-gray-100">
                    <span>下达时间: {pr.createTime}</span>
                    <button 
                      onClick={() => alert(`【已生成工艺整改通知书打印预览】\n整改单: ${pr.id}\n关联工单: ${pr.orderNo}`)}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      打印工艺整改通知单
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ===================== MODAL: 依据巡检方案进行质检 ===================== */}
      {showSchemeInspectModal && currentMatchedMapping && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-3 sm:p-5">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden border border-blue-300 animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#1e3b5f] via-[#1565c0] to-indigo-900 text-white px-6 py-3.5 flex items-center justify-between shadow-md shrink-0">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center border border-white/20">
                  <FileCheck size={20} className="text-blue-200" />
                </div>
                <div>
                  <h3 className="font-bold text-base tracking-wide flex items-center space-x-2">
                    <span>依据巡检方案质检工作台</span>
                    <span className="text-xs font-mono font-normal bg-blue-500/30 px-2 py-0.5 rounded border border-blue-400/40">
                      {activeScheme.schemeId}
                    </span>
                  </h3>
                  <p className="text-xs text-blue-200 mt-0.5">
                    基于扫码识别物料规格与工序，严格依据《{activeScheme.schemeName}》规程条目执行检验判定
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setShowSchemeInspectModal(false)}
                className="text-gray-300 hover:text-white p-1 rounded hover:bg-white/10 transition-colors"
              >
                <XCircle size={22} />
              </button>
            </div>

            {/* Modal Content - Scrollable */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs">
              {/* 受检批次与方案源信息横幅 */}
              <div className="bg-gradient-to-r from-blue-50/80 via-indigo-50/40 to-slate-50 border border-blue-200 rounded-lg p-3.5 shadow-xs">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div>
                    <span className="text-gray-400 block text-[11px]">扫码识别来源</span>
                    <div className="font-mono font-bold text-gray-800 text-xs mt-0.5 flex items-center space-x-1">
                      <span className="bg-blue-100 text-blue-900 px-1.5 py-0.5 rounded text-[10px]">盘具</span>
                      <span>{currentMatchedMapping.spoolNo}</span>
                      <span className="text-gray-400">/</span>
                      <span className="bg-indigo-100 text-indigo-900 px-1.5 py-0.5 rounded text-[10px]">SN</span>
                      <span>{currentMatchedMapping.materialSN}</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-gray-400 block text-[11px]">受检物料名称与规格</span>
                    <div className="font-bold text-gray-900 text-xs mt-0.5">
                      {currentMatchedMapping.materialName}
                    </div>
                    <div className="font-mono text-blue-700 text-[11px] font-semibold">
                      {currentMatchedMapping.spec}
                    </div>
                  </div>

                  <div>
                    <span className="text-gray-400 block text-[11px]">派工单 / 生产工序 / 机台</span>
                    <div className="font-bold text-gray-800 text-xs mt-0.5">
                      <span className="font-mono text-blue-700">{currentMatchedMapping.orderNo}</span> · {currentMatchedMapping.process}
                    </div>
                    <div className="text-gray-500 text-[11px]">
                      {currentMatchedMapping.machineId} (批次: {currentMatchedMapping.batchNo})
                    </div>
                  </div>

                  <div>
                    <span className="text-gray-400 block text-[11px]">执行技术标准文档</span>
                    <div className="font-mono text-gray-700 text-[11px] mt-0.5 font-medium">
                      {activeScheme.standardDoc}
                    </div>
                    <div className="text-emerald-700 font-semibold text-[11px]">
                      规程版本: {activeScheme.version}
                    </div>
                  </div>
                </div>

                {/* 检验人员与快捷填报操作条 */}
                <div className="mt-3 pt-2.5 border-t border-blue-200/60 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-600 font-bold">现场质检员:</span>
                    <input 
                      type="text" 
                      value={schemeInspector} 
                      onChange={(e) => setSchemeInspector(e.target.value)} 
                      className="border border-gray-300 rounded px-2.5 py-1 bg-white font-medium text-xs w-28 focus:border-blue-500 outline-none"
                    />
                    <span className="text-gray-400 text-[11px]">（质检二组 · 巡回检验岗）</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-gray-400 text-[11px]">快速辅助录入:</span>
                    <button
                      type="button"
                      onClick={() => {
                        const vals: Record<string, string> = {};
                        activeScheme.items.forEach(it => {
                          vals[it.id] = it.defaultValue;
                        });
                        setSchemeValues(vals);
                      }}
                      className="px-2.5 py-1 rounded bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold border border-emerald-300 transition-colors"
                    >
                      ✓ 一键填充全套合格实测值
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const vals: Record<string, string> = {};
                        activeScheme.items.forEach((it, idx) => {
                          // 让第一项或第二项注入异常，其余合格
                          if (idx === 0 && it.abnormalValue) {
                            vals[it.id] = it.abnormalValue;
                          } else {
                            vals[it.id] = it.defaultValue;
                          }
                        });
                        setSchemeValues(vals);
                      }}
                      className="px-2.5 py-1 rounded bg-rose-50 hover:bg-rose-100 text-rose-800 font-bold border border-rose-300 transition-colors"
                      title="注入单项超差数据，用于演练工艺不合格、NCR评审与工艺整改"
                    >
                      ⚠ 模拟注入工艺超差项 (演练NCR整改)
                    </button>
                    <button
                      type="button"
                      onClick={() => setSchemeValues({})}
                      className="px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-600 border border-gray-300 transition-colors"
                    >
                      清空
                    </button>
                  </div>
                </div>
              </div>

              {/* 巡检方案条目检验列表 */}
              <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-xs">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-[#f1f5f9] border-b border-gray-200 text-gray-700 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="py-2.5 px-3 w-10 text-center border-r border-gray-200">序号</th>
                      <th className="py-2.5 px-3 border-r border-gray-200 w-36">方案检验项目</th>
                      <th className="py-2.5 px-3 border-r border-gray-200 w-48">规程标准参数要求</th>
                      <th className="py-2.5 px-3 border-r border-gray-200 w-44">检具与量仪要求</th>
                      <th className="py-2.5 px-3 border-r border-gray-200">检验与抽样规程</th>
                      <th className="py-2.5 px-3 border-r border-gray-200 w-44">
                        现场实测值 <span className="text-red-500">*</span>
                      </th>
                      <th className="py-2.5 px-3 text-center w-28">单项判定</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {activeScheme.items.map((item, idx) => {
                      const currentVal = schemeValues[item.id] !== undefined ? schemeValues[item.id] : item.defaultValue;
                      const checkRes = checkItemResult(item, currentVal);

                      return (
                        <tr 
                          key={item.id} 
                          className={`transition-colors ${
                            !checkRes.pass ? 'bg-rose-50/40 hover:bg-rose-50/70' : 'hover:bg-blue-50/30'
                          }`}
                        >
                          <td className="py-2.5 px-3 text-center font-mono text-gray-500 border-r border-gray-200 font-medium">
                            {idx + 1}
                          </td>
                          <td className="py-2.5 px-3 border-r border-gray-200 font-bold text-gray-900">
                            <div className="flex items-center space-x-1.5">
                              <span>{item.name}</span>
                            </div>
                            <span className="text-[10px] text-gray-400 font-mono font-normal">编号: {item.id}</span>
                          </td>
                          <td className="py-2.5 px-3 border-r border-gray-200 font-mono font-semibold text-gray-800">
                            <div>{item.standard}</div>
                            {item.min !== undefined && item.max !== undefined && (
                              <div className="text-[10px] text-gray-400 font-normal">
                                公差区间: [{item.min} ~ {item.max}] {item.unit}
                              </div>
                            )}
                          </td>
                          <td className="py-2.5 px-3 border-r border-gray-200 text-gray-600">
                            <div className="font-medium text-gray-800">{item.tool}</div>
                          </td>
                          <td className="py-2.5 px-3 border-r border-gray-200 text-gray-500 leading-snug">
                            {item.method}
                          </td>
                          <td className="py-2.5 px-3 border-r border-gray-200">
                            <div className="relative">
                              <input
                                type="text"
                                value={currentVal}
                                onChange={(e) => {
                                  setSchemeValues(prev => ({
                                    ...prev,
                                    [item.id]: e.target.value
                                  }));
                                }}
                                placeholder={`请输入实测值 (${item.unit || '数值'})...`}
                                className={`w-full rounded px-2.5 py-1.5 font-mono font-bold text-xs border outline-none transition-all ${
                                  !checkRes.pass 
                                    ? 'border-red-500 bg-red-50 text-red-900 focus:ring-2 focus:ring-red-200' 
                                    : 'border-blue-400 bg-blue-50/20 text-blue-900 focus:ring-2 focus:ring-blue-200'
                                }`}
                              />
                            </div>
                            <div className="mt-1 flex items-center justify-between text-[10px]">
                              <span className={!checkRes.pass ? 'text-red-600 font-semibold' : 'text-emerald-600 font-medium'}>
                                {checkRes.desc}
                              </span>
                              <button
                                type="button"
                                onClick={() => {
                                  setSchemeValues(prev => ({
                                    ...prev,
                                    [item.id]: item.defaultValue
                                  }));
                                }}
                                className="text-gray-400 hover:text-blue-600 underline"
                              >
                                填默认
                              </button>
                            </div>
                          </td>
                          <td className="py-2.5 px-3 text-center">
                            {checkRes.pass ? (
                              <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                                <CheckCircle2 size={13} />
                                <span>合格</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300 animate-pulse">
                                <XCircle size={13} />
                                <span>不合格</span>
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* 质检总结与联动配置区 */}
              {(() => {
                const results = activeScheme.items.map(it => {
                  const v = schemeValues[it.id] !== undefined ? schemeValues[it.id] : it.defaultValue;
                  return checkItemResult(it, v);
                });
                const failCount = results.filter(r => !r.pass).length;
                const passCount = results.length - failCount;
                const isAllPass = failCount === 0;

                return (
                  <div className={`p-4 rounded-lg border flex flex-wrap items-center justify-between gap-3 ${
                    isAllPass ? 'bg-emerald-50/80 border-emerald-200' : 'bg-rose-50/80 border-rose-200'
                  }`}>
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shadow-sm ${
                        isAllPass ? 'bg-emerald-600' : 'bg-rose-600'
                      }`}>
                        {isAllPass ? <CheckCircle size={24} /> : <AlertTriangle size={24} />}
                      </div>
                      <div>
                        <div className="text-sm font-bold flex items-center space-x-2">
                          <span className={isAllPass ? 'text-emerald-950' : 'text-rose-950'}>
                            全方案综合判定结果: 
                          </span>
                          <span className={`px-2.5 py-0.5 rounded text-xs font-bold ${
                            isAllPass ? 'bg-emerald-200 text-emerald-900' : 'bg-rose-200 text-rose-900'
                          }`}>
                            {isAllPass ? '✓ 全项合格 (PASS)' : `✗ 不合格 - 发现 ${failCount} 项指标超差 (FAIL)`}
                          </span>
                        </div>
                        <div className="text-xs text-gray-600 mt-1">
                          检验项目总计: <strong className="font-mono">{results.length}</strong> 项 | 
                          合格: <strong className="text-emerald-700 font-mono">{passCount}</strong> 项 | 
                          超差: <strong className="text-rose-700 font-mono">{failCount}</strong> 项
                        </div>
                      </div>
                    </div>

                    {!isAllPass && (
                      <div className="bg-white/80 border border-rose-300 p-2.5 rounded text-xs text-rose-900 flex items-center space-x-2">
                        <label className="flex items-center space-x-2 font-bold cursor-pointer">
                          <input 
                            type="checkbox"
                            checked={schemeAutoNCR}
                            onChange={(e) => setSchemeAutoNCR(e.target.checked)}
                            className="w-4 h-4 text-rose-600 rounded"
                          />
                          <span>超差时自动创建不合格品NCR单，并联动下达【工艺整改要求记录】</span>
                        </label>
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-100 px-6 py-3 border-t border-gray-300 flex items-center justify-between shrink-0">
              <div className="text-xs text-gray-500">
                <span>金杯电工巡回检验质量管理平台 · 依据质量管理体系技术规范执行</span>
              </div>
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowSchemeInspectModal(false)}
                  className="bg-white hover:bg-gray-200 border border-gray-300 px-5 py-2 rounded text-xs font-medium text-gray-700 transition-colors"
                >
                  取消
                </button>
                <button
                  type="button"
                  onClick={handleSaveSchemeInspection}
                  className="bg-gradient-to-r from-blue-700 to-indigo-800 hover:from-blue-800 hover:to-indigo-900 text-white px-7 py-2 rounded text-xs font-bold shadow-md transition-all flex items-center space-x-1.5"
                >
                  <Save size={15} />
                  <span>保存并归档方案检验记录</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================== MODAL: 录入过程检验数据 ===================== */}
      {showAddRecordModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-xl overflow-hidden border border-gray-300 animate-in fade-in zoom-in-95 duration-150">
            <div className="bg-[#1e3b5f] text-white px-5 py-3 flex items-center justify-between">
              <span className="font-bold text-base flex items-center space-x-2">
                <ListChecks size={18} />
                <span>录入过程检验数据</span>
              </span>
              <button onClick={() => setShowAddRecordModal(false)} className="text-gray-300 hover:text-white">
                <XCircle size={20} />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-bold mb-1">工单号 <span className="text-red-500">*</span></label>
                  <select 
                    value={newOrderNo}
                    onChange={(e) => setNewOrderNo(e.target.value)}
                    className="w-full border border-gray-300 rounded p-2 bg-gray-50 font-mono font-bold text-gray-800 outline-none focus:border-blue-500"
                  >
                    <option value="PG20260400047">PG20260400047 (聚酯亚胺漆包圆铜线)</option>
                    <option value="PG20260400049">PG20260400049 (缩醛漆包铜圆线)</option>
                    <option value="PG20260400050">PG20260400050 (聚酯亚胺漆包线)</option>
                    <option value="PG20260400073">PG20260400073 (纸包绕包扁铜线)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-1">工序 <span className="text-red-500">*</span></label>
                  <select 
                    value={newProcess}
                    onChange={(e) => setNewProcess(e.target.value)}
                    className="w-full border border-gray-300 rounded p-2 bg-white font-bold text-gray-800 outline-none focus:border-blue-500"
                  >
                    <option value="漆包">漆包工序</option>
                    <option value="涂漆">涂漆工序</option>
                    <option value="拉丝">拉丝工序</option>
                    <option value="绞线">绞线工序</option>
                    <option value="烧结">烧结工序</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-1">机台号</label>
                  <input 
                    type="text" 
                    value={newMachineId} 
                    onChange={(e) => setNewMachineId(e.target.value)}
                    className="w-full border border-gray-300 rounded p-2 font-mono" 
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-1">盘具/批次号</label>
                  <input 
                    type="text" 
                    value={newSpoolNo} 
                    onChange={(e) => setNewSpoolNo(e.target.value)}
                    className="w-full border border-gray-300 rounded p-2 font-mono" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">检验项目 <span className="text-red-500">*</span></label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {itemPresets.map(preset => (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() => handleItemSelect(preset.name)}
                      className={`px-2 py-1 rounded text-[11px] font-medium border transition-colors ${
                        newItem === preset.name 
                          ? 'bg-blue-600 text-white border-blue-600' 
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-300'
                      }`}
                    >
                      {preset.name}
                    </button>
                  ))}
                </div>
                <input 
                  type="text" 
                  value={newItem} 
                  onChange={(e) => setNewItem(e.target.value)}
                  className="w-full border border-gray-300 rounded p-2 font-bold" 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-bold mb-1">标准参数要求</label>
                  <input 
                    type="text" 
                    value={newStandard} 
                    onChange={(e) => setNewStandard(e.target.value)}
                    className="w-full border border-gray-300 rounded p-2 font-mono bg-gray-50" 
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-1">实测值 <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    placeholder="如: 1.253 mm"
                    value={newMeasuredValue} 
                    onChange={(e) => setNewMeasuredValue(e.target.value)}
                    className="w-full border border-blue-400 rounded p-2 font-mono font-bold text-blue-900 bg-blue-50/20" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-bold mb-1">判定结果 <span className="text-red-500">*</span></label>
                  <div className="flex space-x-3 mt-1">
                    <label className={`flex-1 flex items-center justify-center py-2 px-4 rounded border cursor-pointer font-bold ${
                      newResult === '合格' ? 'bg-emerald-50 border-emerald-500 text-emerald-800 ring-2 ring-emerald-200' : 'bg-gray-50 border-gray-300 text-gray-600'
                    }`}>
                      <input 
                        type="radio" 
                        name="result_opt" 
                        className="sr-only" 
                        checked={newResult === '合格'} 
                        onChange={() => setNewResult('合格')} 
                      />
                      <span>✓ 合格</span>
                    </label>

                    <label className={`flex-1 flex items-center justify-center py-2 px-4 rounded border cursor-pointer font-bold ${
                      newResult === '不合格' ? 'bg-rose-50 border-rose-500 text-rose-800 ring-2 ring-rose-200' : 'bg-gray-50 border-gray-300 text-gray-600'
                    }`}>
                      <input 
                        type="radio" 
                        name="result_opt" 
                        className="sr-only" 
                        checked={newResult === '不合格'} 
                        onChange={() => setNewResult('不合格')} 
                      />
                      <span>✗ 不合格</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-1">检验员</label>
                  <input 
                    type="text" 
                    value={newInspector} 
                    onChange={(e) => setNewInspector(e.target.value)}
                    className="w-full border border-gray-300 rounded p-2" 
                  />
                </div>
              </div>

              {/* If result is unqualified, show notice */}
              {newResult === '不合格' && (
                <div className="bg-rose-50 border border-rose-300 p-3 rounded text-rose-900 flex items-start space-x-2">
                  <AlertTriangle size={16} className="text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <label className="flex items-center space-x-2 font-bold cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={autoCreateNCR} 
                        onChange={(e) => setAutoCreateNCR(e.target.checked)}
                        className="w-4 h-4 text-rose-600 rounded" 
                      />
                      <span>同时发起不合格品处理(NCR)，并准备OA评审与工艺整改</span>
                    </label>
                    <p className="text-[11px] text-rose-700 mt-1">勾选后将自动在NCR模块生成处理单，若是工艺不合格将触发工艺整改要求。</p>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-gray-100 px-6 py-3 border-t border-gray-300 flex justify-end space-x-3">
              <button
                onClick={() => setShowAddRecordModal(false)}
                className="bg-white hover:bg-gray-200 border border-gray-300 px-5 py-1.5 rounded text-xs font-medium text-gray-700"
              >
                取消
              </button>
              <button
                onClick={handleSaveRecord}
                className="bg-[#1976d2] hover:bg-[#1565c0] text-white px-6 py-1.5 rounded text-xs font-bold shadow-sm"
              >
                确认保存检验数据
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================== MODAL: 发起OA评审 ===================== */}
      {showOAModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-xl overflow-hidden border border-gray-300 animate-in fade-in zoom-in-95 duration-150">
            <div className="bg-[#1e3b5f] text-white px-5 py-3 flex items-center justify-between">
              <span className="font-bold text-base flex items-center space-x-2">
                <Send size={18} />
                <span>发起OA评审流程 (OA Approval Workflow)</span>
              </span>
              <button onClick={() => setShowOAModal(null)} className="text-gray-300 hover:text-white">
                <XCircle size={20} />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="bg-blue-50 border border-blue-200 p-3 rounded">
                <div className="font-bold text-blue-900">关联不合格处理单: {showOAModal.id}</div>
                <div className="text-gray-700 mt-1">工单: {showOAModal.orderNo} | 工序: {showOAModal.process} | 不合格项: {showOAModal.item}</div>
                <div className="text-red-700 font-semibold mt-1">不合格原因: {showOAModal.defectReason}</div>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">OA评审主题 <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  value={oaTitle} 
                  onChange={(e) => setOaTitle(e.target.value)}
                  className="w-full border border-gray-300 rounded p-2 font-medium" 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-bold mb-1">紧急程度</label>
                  <select 
                    value={oaUrgency}
                    onChange={(e) => setOaUrgency(e.target.value as any)}
                    className="w-full border border-gray-300 rounded p-2 bg-white"
                  >
                    <option value="普通">普通 (48小时内审结)</option>
                    <option value="紧急">紧急 (24小时内审结)</option>
                    <option value="特急">特急 (12小时内审结)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-1">会签审批部门</label>
                  <input 
                    type="text" 
                    value={oaReviewDept} 
                    onChange={(e) => setOaReviewDept(e.target.value)}
                    className="w-full border border-gray-300 rounded p-2" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">评审处理措施说明与请示意见</label>
                <textarea 
                  rows={3} 
                  value={oaSuggestionInput} 
                  onChange={(e) => setOaSuggestionInput(e.target.value)}
                  placeholder="请输入拟提交OA评审的处置措施、返修/让步接收方案或整改要求..."
                  className="w-full border border-gray-300 rounded p-2 leading-relaxed"
                />
              </div>

              <div className="p-3 bg-gray-50 rounded border border-gray-200 text-[11px] text-gray-500">
                <span className="font-bold text-gray-700">OA流程流向预演：</span> 
                发起人提交 → 质量工程师初审 → 车间主任会签 → 工艺技术科评审 → 生产质量总监核批。
              </div>
            </div>

            <div className="bg-gray-100 px-6 py-3 border-t border-gray-300 flex justify-end space-x-3">
              <button
                onClick={() => setShowOAModal(null)}
                className="bg-white hover:bg-gray-200 border border-gray-300 px-5 py-1.5 rounded text-xs font-medium text-gray-700"
              >
                取消
              </button>
              <button
                onClick={handleSubmitOA}
                className="bg-[#1976d2] hover:bg-[#1565c0] text-white px-6 py-1.5 rounded text-xs font-bold shadow-sm flex items-center space-x-1"
              >
                <Send size={13} />
                <span>立即提交OA评审</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================== MODAL: 发起工艺整改记录 ===================== */}
      {(showRectificationModal || showNewManualPRModal) && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-xl overflow-hidden border border-gray-300 animate-in fade-in zoom-in-95 duration-150">
            <div className="bg-rose-900 text-white px-5 py-3 flex items-center justify-between">
              <span className="font-bold text-base flex items-center space-x-2">
                <Wrench size={18} />
                <span>下达工艺整改要求 · 发起工艺整改记录</span>
              </span>
              <button 
                onClick={() => {
                  setShowRectificationModal(null);
                  setShowNewManualPRModal(false);
                }} 
                className="text-gray-300 hover:text-white"
              >
                <XCircle size={20} />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="bg-rose-50 border border-rose-200 p-3 rounded text-rose-900">
                <div className="font-bold">工艺不合格源单信息：</div>
                <div className="mt-1">
                  关联NCR: {showRectificationModal ? showRectificationModal.id : '手工新增工艺整改'} | 
                  工单号: {showRectificationModal ? showRectificationModal.orderNo : 'PG20260400050'} | 
                  工序: {showRectificationModal ? showRectificationModal.process : '漆包'}
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">
                  工艺整改要求 (Process Rectification Requirements) <span className="text-red-500">*</span>
                </label>
                <textarea 
                  rows={4} 
                  value={prRequirement} 
                  onChange={(e) => setPrRequirement(e.target.value)}
                  placeholder="例如：1. 重新校准退火烘烤炉温控探头；2. 更换磨损超出公差的拉丝/涂线模具；3. 调整漆液循环粘度至标准范围..."
                  className="w-full border border-gray-300 rounded p-2.5 leading-relaxed font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-bold mb-1">责任工艺工程师 <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    value={prEngineer} 
                    onChange={(e) => setPrEngineer(e.target.value)}
                    className="w-full border border-gray-300 rounded p-2" 
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-1">要求完成时限 <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    value={prDeadline} 
                    onChange={(e) => setPrDeadline(e.target.value)}
                    className="w-full border border-gray-300 rounded p-2 font-mono" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">整改预防措施初步计划</label>
                <textarea 
                  rows={2} 
                  value={prPreventiveAction} 
                  onChange={(e) => setPrPreventiveAction(e.target.value)}
                  placeholder="如：修订本工序SOP规程，对操作班组开展工艺交底，增加首盘复验频次..."
                  className="w-full border border-gray-300 rounded p-2 leading-relaxed"
                />
              </div>
            </div>

            <div className="bg-gray-100 px-6 py-3 border-t border-gray-300 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowRectificationModal(null);
                  setShowNewManualPRModal(false);
                }}
                className="bg-white hover:bg-gray-200 border border-gray-300 px-5 py-1.5 rounded text-xs font-medium text-gray-700"
              >
                取消
              </button>
              <button
                onClick={handleSubmitRectification}
                className="bg-rose-700 hover:bg-rose-800 text-white px-6 py-1.5 rounded text-xs font-bold shadow-sm"
              >
                下发整改要求并生成整改记录
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================== MODAL: 工艺整改复核验证 ===================== */}
      {showVerifyModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg overflow-hidden border border-gray-300 animate-in fade-in zoom-in-95 duration-150">
            <div className="bg-emerald-800 text-white px-5 py-3 flex items-center justify-between">
              <span className="font-bold text-base flex items-center space-x-2">
                <CheckCircle size={18} />
                <span>工艺整改复核验证与闭环</span>
              </span>
              <button onClick={() => setShowVerifyModal(null)} className="text-gray-300 hover:text-white">
                <XCircle size={20} />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="bg-emerald-50 border border-emerald-200 p-3 rounded text-emerald-900">
                <div className="font-bold">工艺整改单号: {showVerifyModal.id}</div>
                <div className="mt-1">整改要求: {showVerifyModal.requirement}</div>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">
                  复核验证结论及实测数据 <span className="text-red-500">*</span>
                </label>
                <textarea 
                  rows={4} 
                  value={verifyConclusion} 
                  onChange={(e) => setVerifyConclusion(e.target.value)}
                  placeholder="填写质量部/工艺部复测结果，如：连续3卷测试外径1.251mm、击穿电压4800V，均符合公差要求，整改合格准予闭环..."
                  className="w-full border border-gray-300 rounded p-2.5 leading-relaxed font-medium"
                />
              </div>
            </div>

            <div className="bg-gray-100 px-6 py-3 border-t border-gray-300 flex justify-end space-x-3">
              <button
                onClick={() => setShowVerifyModal(null)}
                className="bg-white hover:bg-gray-200 border border-gray-300 px-5 py-1.5 rounded text-xs font-medium text-gray-700"
              >
                取消
              </button>
              <button
                onClick={handleVerifyClose}
                className="bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-1.5 rounded text-xs font-bold shadow-sm"
              >
                确认复核合格并闭环
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const HomeMenu = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  const menuItems = [
    { icon: ClipboardList, label: '我的任务', id: 'tasks', color: 'text-blue-500' },
    { icon: CheckSquare, label: '检验任务', id: 'inspect', color: 'text-green-500' },
    { icon: FileCheck, label: '巡回检', id: 'patrol-inspection', color: 'text-amber-500' },
    { icon: Archive, label: '废品归集', id: 'scrap', color: 'text-gray-500' },
    { icon: Settings, label: '设备点检', id: 'equip-check', color: 'text-indigo-500' },
    { icon: AlertTriangle, label: '设备报修', id: 'equip-repair', color: 'text-red-500' },
    { icon: Zap, label: '设备验收', id: 'equip-accept', color: 'text-yellow-500' },
    { icon: PackagePlus, label: '入库申请', id: 'storage-apply', color: 'text-teal-500' },
  ];

  return (
    <div className="p-8 grid grid-cols-4 gap-6 content-start bg-[#f3f4f6] h-full overflow-y-auto">
      {menuItems.map((item) => (
        <button
          key={item.id}
          onClick={() => onNavigate(item.id)}
          className="bg-white p-6 rounded shadow-sm hover:shadow-md transition-shadow flex flex-col items-center justify-center space-y-4 h-40 border border-gray-100 hover:border-blue-200 group"
        >
          <div className={`p-4 bg-gray-50 group-hover:scale-110 transition-transform rounded-full ${item.color}`}>
            <item.icon size={48} strokeWidth={1.5} />
          </div>
          <span className="text-gray-700 font-medium text-lg group-hover:text-blue-600 transition-colors">{item.label}</span>
        </button>
      ))}
    </div>
  );
};

const EquipCheckView = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [currentPartIndex, setCurrentPartIndex] = useState<number | null>(null);

  const [parts, setParts] = useState([
    {
      id: 'p1',
      name: '主设备',
      result: true,
      notes: '',
      details: [
        { id: 'd1', item: '设备表面8S，无锡灰残留', standard: '打扫清理', result: true, notes: '' },
        { id: 'd2', item: '检查气管和接口有无漏气，阀门无损坏', standard: '无漏气，阀门无损坏', result: true, notes: '' },
        { id: 'd3', item: '循环水管路无漏水，水质干净、水正常', standard: '无漏水，水质干净、水正常', result: true, notes: '' },
        { id: 'd4', item: '使用无尘布+酒精擦拭上下铜轮表面', standard: '铜轮表面清洁，无凹槽', result: true, notes: '' },
        { id: 'd5', item: '过桥导轮转动正常，无磨损', standard: '转动正常，无磨损', result: true, notes: '' },
      ]
    }
  ]);

  const openDetails = (idx: number) => {
    setCurrentPartIndex(idx);
    setShowDetailModal(true);
  };

  const ToggleSwitch = ({ checked, onChange }: { checked: boolean, onChange: (c: boolean) => void }) => (
    <div 
      className={`w-14 h-7 rounded-full relative cursor-pointer transition-colors shadow-inner border border-gray-300 ${checked ? 'bg-green-500' : 'bg-gray-200'}`}
      onClick={() => onChange(!checked)}
    >
      <div className={`w-6 h-6 bg-white rounded-full absolute top-[1px] shadow transition-transform ${checked ? 'translate-x-[26px]' : 'translate-x-[1px]'}`} />
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-white overflow-y-auto p-6">
      <div className="max-w-6xl mx-auto w-full">
        <div className="flex justify-between items-center mb-6 pb-4 border-b">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <Settings className="mr-3 text-indigo-500" />
            设备点检
          </h2>
        </div>

        <div className="flex justify-center mb-6">
          <span className="text-red-500 font-bold text-xl tracking-widest">设备点检</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6 mb-8 items-end">
          <div className="flex flex-col">
            <label className="text-sm font-bold text-gray-700 mb-1">设备名称</label>
            <select className="border border-gray-300 rounded-md px-3 py-2 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>汇流带生产线 (HX-Y4)</option>
              <option>拉丝机A</option>
            </select>
          </div>
          
          <div className="flex flex-col">
            <div className="text-sm font-bold text-gray-700 mb-1">设备代码</div>
            <div className="text-gray-900 font-medium py-2">HX-Y4</div>
          </div>

          <div className="flex flex-col">
            <div className="text-sm font-bold text-gray-700 mb-1">设备地址</div>
            <div className="text-gray-900 font-medium py-2">2#厂房1F西-压延</div>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-bold text-gray-700 mb-1">点检时间</label>
            <input type="datetime-local" defaultValue="2026-05-09T16:08" className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-bold text-gray-700 mb-1">点检人</label>
            <div className="flex items-center space-x-2 h-[42px]">
              <div className="p-1.5 border border-gray-400 rounded-full hover:bg-gray-100 cursor-pointer text-gray-700">
                <Search size={20} />
              </div>
              <span className="font-bold text-gray-900 border-b border-gray-300 px-2 pb-1">苏声波</span>
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-bold text-gray-700 mb-1">点检类型</label>
            <select className="border border-gray-300 rounded-md px-3 py-2 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>设备点检</option>
              <option>日常保养</option>
            </select>
          </div>
        </div>

        <table className="w-full text-sm text-center border-collapse border border-gray-300 mb-8">
          <thead className="bg-[#f2f2f2] font-bold text-black border-b border-gray-300">
            <tr>
              <th className="border-r border-gray-300 p-3 w-1/3">点检部位</th>
              <th className="border-r border-gray-300 p-3 w-1/3">部位点检结果</th>
              <th className="p-3 w-1/3">说明</th>
            </tr>
          </thead>
          <tbody>
            {parts.map((p, idx) => (
              <tr key={p.id} className="border-b border-gray-300">
                 <td className="border-r border-gray-300 p-3 bg-[#baddf5] relative">
                   <button 
                     onClick={() => openDetails(idx)} 
                     className="absolute left-6 top-1/2 -translate-y-1/2 bg-[#3399cc] text-white px-5 py-1.5 rounded text-sm font-bold shadow hover:bg-[#2888b8] transition-colors"
                   >
                     明细
                   </button>
                   <span className="font-medium text-gray-800 text-lg">{p.name}</span>
                 </td>
                 <td className="border-r border-gray-300 p-3 bg-[#89cdee]">
                   <div className="flex flex-col items-center justify-center space-y-2">
                     <ToggleSwitch checked={p.result} onChange={(c) => {
                       const np = [...parts]; np[idx].result = c; setParts(np);
                     }} />
                     {!p.result && (
                       <button 
                         onClick={() => onNavigate('equip-repair')}
                         className="text-xs bg-red-100 text-red-600 px-3 py-1 rounded shadow-sm hover:bg-red-200"
                       >
                         去报修
                       </button>
                     )}
                   </div>
                 </td>
                 <td className="p-3 bg-[#e6f4fc]">
                   <input type="text" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" value={p.notes} onChange={(e) => {
                     const np = [...parts]; np[idx].notes = e.target.value; setParts(np);
                   }} />
                 </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-8 flex justify-center">
           <button 
             onClick={() => alert('保存成功！')}
             className="bg-[#1976d2] hover:bg-[#1565c0] text-white px-16 py-3 rounded text-lg font-bold shadow-md transition-colors"
           >
             保存
           </button>
        </div>

        {/* Modal Overlay */}
        {showDetailModal && currentPartIndex !== null && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
             <div className="bg-white shadow-2xl w-full max-w-4xl flex flex-col border border-gray-300">
               <div className="overflow-auto max-h-[70vh]">
                 <table className="w-full text-sm text-center border-collapse">
                   <thead className="bg-[#f0f0f0] font-bold text-gray-800 sticky top-0 shadow-sm z-10 border-b border-gray-300">
                     <tr>
                       <th className="border-r border-gray-300 p-3 w-[40%]">点检项目</th>
                       <th className="border-r border-gray-300 p-3 w-[25%]">标准</th>
                       <th className="border-r border-gray-300 p-3 w-[15%]">点检结果</th>
                       <th className="p-3 w-[20%]">说明</th>
                     </tr>
                   </thead>
                   <tbody>
                     {parts[currentPartIndex].details.map((d, dIdx) => (
                       <tr key={d.id} className="hover:bg-blue-50 border-b border-gray-300 transition-colors">
                         <td className="border-r border-gray-300 p-3 text-left font-medium text-gray-700">{d.item}</td>
                         <td className="border-r border-gray-300 p-3 text-left text-gray-600">{d.standard}</td>
                         <td className="border-r border-gray-300 p-3">
                           <div className="flex flex-col items-center justify-center space-y-2">
                             <ToggleSwitch checked={d.result} onChange={(c) => {
                                const np = [...parts];
                                np[currentPartIndex].details[dIdx].result = c;
                                setParts(np);
                             }} />
                             {!d.result && (
                               <button 
                                 onClick={() => {
                                   setShowDetailModal(false);
                                   onNavigate('equip-repair');
                                 }}
                                 className="text-xs bg-red-100 text-red-600 px-3 py-1 rounded shadow-sm hover:bg-red-200"
                               >
                                 去报修
                               </button>
                             )}
                           </div>
                         </td>
                         <td className="p-3">
                           <input type="text" className="w-full border border-gray-300 rounded px-2 py-1.5 focus:border-blue-500 focus:outline-none" value={d.notes} onChange={(e) => {
                             const np = [...parts];
                             np[currentPartIndex].details[dIdx].notes = e.target.value;
                             setParts(np);
                           }} />
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
               <div className="p-5 border-t border-gray-300 flex justify-center space-x-6">
                 <button onClick={() => setShowDetailModal(false)} className="bg-[#1976d2] text-white px-10 py-2.5 rounded font-bold hover:bg-[#1565c0] transition-colors shadow">
                   确认
                 </button>
                 <button onClick={() => setShowDetailModal(false)} className="bg-red-500 text-white px-10 py-2.5 rounded font-bold hover:bg-red-600 transition-colors shadow">
                   取消
                 </button>
               </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};



const EquipFixView = () => {
  const [activeTab, setActiveTab] = useState<'report' | 'tasks' | 'accept'>('tasks');
  const [showProgress, setShowProgress] = useState(false);

  return (
    <div className="flex flex-col h-full bg-[#f3f4f6]">
      {/* Top Tabs */}
      <div className="flex space-x-1 border-b px-2 bg-white pt-2 shrink-0">
        <button 
          onClick={() => setActiveTab('report')}
          className={`px-4 py-2 text-[17px] tracking-widest leading-loose ${activeTab === 'report' ? 'text-black font-bold border-b-[3px] border-black' : 'text-gray-600 hover:text-black font-medium'}`}
        >
          故障报修
        </button>
        <button 
          onClick={() => setActiveTab('tasks')}
          className={`px-4 py-2 text-[17px] tracking-widest leading-loose ${activeTab === 'tasks' ? 'text-black font-bold border-b-[3px] border-black' : 'text-gray-600 hover:text-black font-medium'}`}
        >
          维修任务
        </button>
        <button 
          onClick={() => setActiveTab('accept')}
          className={`px-4 py-2 text-[17px] tracking-widest leading-loose ${activeTab === 'accept' ? 'text-black font-bold border-b-[3px] border-black' : 'text-gray-600 hover:text-black font-medium'}`}
        >
          维修验收
        </button>
      </div>

      <div className="flex-1 bg-[#a5a5a5] border border-gray-700 m-8 overflow-auto relative">
        <table className="w-full text-left border-collapse table-fixed bg-transparent">
          <thead>
            <tr className="bg-[#f0f0f0] text-black border-b border-gray-500">
              <th className="font-medium px-2 py-2 border-r border-gray-400 text-center text-lg w-[15%] tracking-widest">故障类型</th>
              <th className="font-medium px-2 py-2 border-r border-gray-400 text-center text-lg w-[18%] tracking-widest">故障时间</th>
              <th className="font-medium px-2 py-2 border-r border-gray-400 text-center text-lg w-[15%] tracking-widest">故障设备</th>
              <th className="font-medium px-2 py-2 border-r border-gray-400 text-center text-lg w-[20%] tracking-widest">故障位置</th>
              <th className="font-medium px-2 py-2 border-r border-gray-400 text-center text-lg w-[15%] tracking-widest">维修人员</th>
              <th className="font-medium px-2 py-2 text-center text-lg w-[17%] tracking-widest">操作</th>
            </tr>
          </thead>
          <tbody>
            {activeTab === 'tasks' && (
              <>
                <tr className="border-[0]">
                  <td className="px-2 py-3 text-center text-lg text-gray-800">电气故障</td>
                  <td className="px-2 py-3 text-center text-lg text-gray-800">2026-05-11 14:30:00</td>
                  <td className="px-2 py-3 text-center text-lg text-gray-800">拉丝机A</td>
                  <td className="px-2 py-3 text-center text-lg text-gray-800">主控制柜</td>
                  <td className="px-2 py-3 text-center text-lg text-gray-800">王工</td>
                  <td className="px-2 py-3 text-center">
                    <button 
                      onClick={() => setShowProgress(true)}
                      className="bg-transparent hover:bg-black/10 text-black px-4 py-1 rounded text-base border border-gray-600 tracking-wider">
                      进度查看
                    </button>
                  </td>
                </tr>
                <tr className="border-[0]">
                  <td className="px-2 py-3 text-center text-lg text-gray-800">机械故障</td>
                  <td className="px-2 py-3 text-center text-lg text-gray-800">2026-05-10 09:15:00</td>
                  <td className="px-2 py-3 text-center text-lg text-gray-800">漆包线机</td>
                  <td className="px-2 py-3 text-center text-lg text-gray-800">收线端轴承</td>
                  <td className="px-2 py-3 text-center text-lg text-gray-800">李工</td>
                  <td className="px-2 py-3 text-center">
                    <button 
                      onClick={() => setShowProgress(true)}
                      className="bg-transparent hover:bg-black/10 text-black px-4 py-1 rounded text-base border border-gray-600 tracking-wider">
                      进度查看
                    </button>
                  </td>
                </tr>
              </>
            )}
            {activeTab === 'report' && (
              <tr>
                <td colSpan={6} className="text-center py-8 text-gray-600 italic">暂无报修记录</td>
              </tr>
            )}
            {activeTab === 'accept' && (
              <tr>
                <td colSpan={6} className="text-center py-8 text-gray-600 italic">暂无验收记录</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showProgress && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg flex flex-col">
            <div className="p-4 border-b flex justify-between items-center bg-gray-50 rounded-t-lg">
              <h3 className="text-lg font-bold text-gray-800">维修进度查看</h3>
              <button onClick={() => setShowProgress(false)} className="text-gray-500 hover:text-black">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="p-6">
              <div className="relative border-l-2 border-blue-500 ml-4 space-y-8">
                <div className="relative">
                  <div className="absolute -left-[25px] bg-blue-500 rounded-full w-4 h-4 border-4 border-white"></div>
                  <div className="ml-4">
                    <h4 className="font-bold text-gray-800 text-sm">已接单</h4>
                    <p className="text-xs text-gray-500 mt-1">2026-05-11 14:35:00 - 王工</p>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -left-[25px] bg-blue-500 rounded-full w-4 h-4 border-4 border-white"></div>
                  <div className="ml-4">
                    <h4 className="font-bold text-gray-800 text-sm">到达现场，开始排查故障</h4>
                    <p className="text-xs text-gray-500 mt-1">2026-05-11 14:45:00</p>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -left-[25px] bg-gray-300 rounded-full w-4 h-4 border-4 border-white"></div>
                  <div className="ml-4">
                    <h4 className="font-bold text-gray-500 text-sm">更换备件中</h4>
                    <p className="text-xs text-gray-400 mt-1">待执行</p>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -left-[25px] bg-gray-300 rounded-full w-4 h-4 border-4 border-white"></div>
                  <div className="ml-4">
                    <h4 className="font-bold text-gray-500 text-sm">维修完成，待验收</h4>
                    <p className="text-xs text-gray-400 mt-1">待执行</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 border-t flex justify-end bg-gray-50 rounded-b-lg">
              <button onClick={() => setShowProgress(false)} className="bg-[#1976d2] hover:bg-[#1565c0] text-white px-6 py-2 rounded font-medium">关闭</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const EquipAcceptView = ({ onBack }: { onBack: () => void }) => {
  const [repairs, setRepairs] = useState<EquipRepair[]>(mockEquipRepairs);
  const [acceptingRepair, setAcceptingRepair] = useState<EquipRepair | null>(null);

  const handleAcceptAction = (isPass: boolean) => {
    if (acceptingRepair) {
       setRepairs(repairs.map(r => r.id === acceptingRepair.id ? { 
         ...r, 
         status: isPass ? '已验收' : '待维修'
       } : r));
       alert(isPass ? '验收成功' : '已驳回重修');
       setAcceptingRepair(null);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white font-sans overflow-hidden">
      {/* Title Header */}
      <div className="bg-[#1e3b5f] px-4 py-3 flex items-center justify-between shrink-0 text-white shadow-sm">
        <span className="text-[19px] font-bold tracking-widest">设备维修进度查看</span>
        <button onClick={onBack} className="text-white hover:text-gray-200 outline-none p-1 rounded font-bold border border-transparent hover:border-white text-sm">
          返回主页
        </button>
      </div>

      {/* Main Table Content */}
      <div className="flex-1 overflow-auto border-b-2 border-black">
        <table className="w-full text-center text-[15px] border-collapse min-w-max">
          <thead className="bg-[#f2f2f2] border-b-2 border-black text-black">
            <tr>
              <th className="py-3 px-2 font-bold whitespace-nowrap border-b-2 border-black">序号</th>
              <th className="py-3 px-2 font-bold whitespace-nowrap border-b-2 border-black">验收</th>
              <th className="py-3 px-2 font-bold border-b-2 border-black">报修单号<br/>报修时间</th>
              <th className="py-3 px-2 font-bold whitespace-nowrap border-b-2 border-black">维修状态</th>
              <th className="py-3 px-2 font-bold border-b-2 border-black">设备名称<br/>报修类型</th>
              <th className="py-3 px-2 font-bold border-b-2 border-black">子设备<br/>故障描述</th>
              <th className="py-3 px-2 font-bold border-b-2 border-black">设备状态</th>
              <th className="py-3 px-2 font-bold border-b-2 border-black">备品备件</th>
              <th className="py-3 px-2 font-bold border-b-2 border-black">维修完成时间</th>
              <th className="py-3 px-2 font-bold border-b-2 border-black">报修人<br/>维修人</th>
              <th className="py-3 px-2 font-bold border-b-2 border-black">维修时间</th>
              <th className="py-3 px-2 font-bold border-b-2 border-black">实际故障描述</th>
              <th className="py-3 px-2 font-bold border-b-2 border-black">维修内容</th>
              <th className="py-3 px-2 font-bold border-b-2 border-black">备注</th>
            </tr>
          </thead>
          <tbody>
            {repairs.map((r, index) => (
              <tr key={r.id} className="border-b border-gray-300 hover:bg-blue-50 text-[14px]">
                <td className="py-2 px-2 font-bold">{index + 1}</td>
                <td className="py-2 px-2 whitespace-nowrap">
                  {r.status === '待验收' && (
                    <button 
                      onClick={() => setAcceptingRepair(r)} 
                      className="bg-[#1976d2] text-white hover:bg-[#1565c0] px-6 py-1.5 font-bold tracking-widest shadow rounded"
                    >
                      验收
                    </button>
                  )}
                </td>
                <td className="py-2 px-2">
                  <div className="font-bold text-gray-800">{r.reportNo}</div>
                  <div className="text-gray-500 mt-1">{r.reportTime}</div>
                </td>
                <td className="py-2 px-2 font-bold whitespace-nowrap">{r.status}</td>
                <td className="py-2 px-2">
                  <div className="text-gray-800">{r.equipName}</div>
                  <div className="text-gray-500 mt-1">{r.reportType}</div>
                </td>
                <td className="py-2 px-2">
                  <div className="text-gray-800">{r.subEquip}</div>
                  <div className="text-gray-500 mt-1">{r.faultDesc}</div>
                </td>
                <td className="py-2 px-2 font-bold text-blue-800">{r.equipStatus}</td>
                <td className="py-2 px-2 text-gray-600 max-w-[150px] truncate" title={r.spareParts}>{r.spareParts}</td>
                <td className="py-2 px-2 font-mono text-gray-700">{r.repairCompletionTime}</td>
                <td className="py-2 px-2">
                  <div className="text-gray-800">{r.reporter}</div>
                  <div className="text-gray-500 mt-1">{r.repairer}</div>
                </td>
                <td className="py-2 px-2 whitespace-pre-wrap text-left text-gray-600">{r.repairTime}</td>
                <td className="py-2 px-2">{r.actualFaultDesc}</td>
                <td className="py-2 px-2">{r.repairContent}</td>
                <td className="py-2 px-2">{r.remarks}</td>
              </tr>
            ))}
            {repairs.length === 0 && (
              <tr>
                <td colSpan={14} className="py-12 text-gray-500 font-bold text-center">暂无维修记录</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {acceptingRepair && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded w-[450px] flex flex-col font-sans shadow-lg overflow-hidden border border-gray-200">
            <div className="px-5 py-3 flex justify-between items-center bg-white border-b border-gray-100">
               <h3 className="text-[17px] text-gray-800 tracking-wide">设备维修验收</h3>
               <button onClick={() => setAcceptingRepair(null)} className="text-gray-400 hover:text-gray-600 pt-1">
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /></svg>
               </button>
            </div>
            
            <div className="p-8 pb-10 flex items-center justify-center space-x-6 bg-white">
                 <button type="button" onClick={() => handleAcceptAction(false)} className="w-[120px] py-[7px] bg-[#f5f5f5] text-gray-700 rounded-[4px] text-[15px] hover:bg-gray-200 border border-gray-300 transition-colors">驳回重修</button>
                 <button type="button" onClick={() => handleAcceptAction(true)} className="w-[120px] py-[7px] bg-[#1976d2] text-white rounded-[4px] text-[15px] hover:bg-[#1565c0] shadow-sm transition-colors border border-[#1976d2]">验收通过</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const EquipmentRepairView = () => {
  return (
    <div className="flex flex-col h-full bg-[#f3f4f6] font-sans overflow-hidden">
      {/* Top Controls / Tabs */}
      <div className="bg-white border-b border-gray-300 px-6 py-3 flex items-center justify-between shrink-0 shadow-sm">
        <div className="flex items-center space-x-8 text-[16px] font-bold">
          <span className="text-[#1976d2] cursor-pointer border-b-2 border-[#1976d2] pb-1">故障报修</span>
          <span className="text-gray-500 cursor-pointer hover:text-gray-800 pb-1">维修任务</span>
          <span className="text-gray-500 cursor-pointer hover:text-gray-800 pb-1">维修验收</span>
        </div>
        <div className="flex items-center text-[15px] font-bold bg-[#fdfdfd] border border-gray-300 rounded-sm shadow-inner px-2 py-1">
            <span className="text-gray-800 whitespace-nowrap px-1">扫工卡：</span>
            <input type="text" className="w-56 text-black outline-none bg-transparent" />
        </div>
      </div>

      {/* Form Content */}
      <div className="flex-1 overflow-auto p-6 flex justify-center">
         <div className="w-full max-w-5xl space-y-6 bg-white p-10 border border-gray-200 shadow-sm">
            {/* Row 1 */}
            <div className="flex space-x-12">
               <div className="flex items-center flex-1">
                  <span className="w-24 text-right font-bold text-gray-800 mr-4 text-[16px]">安装地点：</span>
                  <select className="flex-1 border border-gray-300 p-2 outline-none bg-[#fdfdfd] text-gray-800">
                    <option>上引</option>
                  </select>
               </div>
               <div className="flex items-center flex-1">
                  <span className="w-24 text-right font-bold text-gray-800 mr-4 text-[16px]">设备类别：</span>
                  <select className="flex-1 border border-gray-300 p-2 outline-none bg-[#fdfdfd] text-gray-800">
                    <option>生产设备</option>
                  </select>
               </div>
            </div>

            {/* Row 2 */}
            <div className="flex space-x-12">
               <div className="flex items-center flex-1">
                  <span className="w-24 text-right font-bold text-gray-800 mr-4 text-[16px]">报修设备：</span>
                  <select className="flex-1 border border-gray-300 p-2 outline-none bg-[#fdfdfd] text-gray-800">
                    <option>SY01*上引法无氧铜杆连铸机组01*SL10-Q</option>
                  </select>
               </div>
               <div className="flex items-center flex-1">
                  <span className="w-24 text-right font-bold text-gray-800 mr-4 text-[16px]">状态：</span>
                  <span className="text-[16px] font-medium text-gray-800">启用</span>
               </div>
            </div>

            {/* Row 3 */}
            <div className="flex space-x-12">
               <div className="flex items-center flex-1">
                  <span className="w-24 text-right font-bold text-gray-800 mr-4 text-[16px]">故障日期：</span>
                  <input type="text" defaultValue="2026-05-10 12:04:36" className="flex-1 border border-gray-300 p-2 outline-none shadow-inner text-gray-800 bg-[#fdfdfd]" />
               </div>
               <div className="flex items-center flex-1">
               </div>
            </div>

            {/* Row 4 */}
            <div className="flex">
               <div className="flex items-start flex-1">
                  <span className="w-24 text-right font-bold text-gray-800 mr-4 text-[16px] pt-3">故障类别：</span>
                  <div className="border border-gray-200 p-5 shrink-0 flex flex-col space-y-4 shadow-sm w-64 bg-[#fbfbfb]">
                     <label className="flex items-center space-x-3 cursor-pointer">
                       <input type="radio" name="fault_type" className="w-[16px] h-[16px] accent-[#1976d2] outline-none" defaultChecked />
                       <span className="font-bold text-gray-800 text-[16px]">电气故障</span>
                     </label>
                     <label className="flex items-center space-x-3 cursor-pointer">
                       <input type="radio" name="fault_type" className="w-[16px] h-[16px] accent-[#1976d2] outline-none" />
                       <span className="font-bold text-gray-800 text-[16px]">机械故障</span>
                     </label>
                  </div>
               </div>
            </div>

            {/* Row 5 */}
            <div className="flex">
               <div className="flex items-center w-[calc(50%-1.5rem)]">
                  <span className="w-24 text-right font-bold text-gray-800 mr-4 text-[16px]">故障位置：</span>
                  <select className="flex-1 border border-gray-300 p-2 outline-none bg-[#fdfdfd] text-gray-800">
                    <option>牵引装置</option>
                  </select>
               </div>
            </div>

            {/* Row 6 */}
            <div className="flex mt-2">
               <div className="flex items-center w-full">
                  <span className="w-24 text-right font-bold text-gray-800 mr-4 text-[16px]">影响工艺：</span>
                  <label className="flex items-center space-x-2 cursor-pointer">
                     <input type="checkbox" className="w-4 h-4 accent-[#1976d2] outline-none" />
                     <span className="font-medium text-gray-800 text-[16px]">是</span>
                  </label>
               </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-8 pb-4">
               <button className="bg-[#1976d2] hover:bg-[#1565c0] text-white font-bold text-2xl py-3 w-[400px] shadow-sm transition-colors rounded-[2px] tracking-[0.5em]">
                 确定
               </button>
            </div>

         </div>
      </div>
    </div>
  );
};

const TaskExecutionView = ({ task, onBack, onNavigate, onStartOrder, onShowMoldModal }: { task: Task, onBack: () => void, onNavigate: (view: string) => void, onStartOrder: () => void, onShowMoldModal: (action: 'mount' | 'unmount' | 'requisition' | 'return') => void }) => {
  const [showDebugPrompt, setShowDebugPrompt] = useState(false);
  const [showFinalInspectPrompt, setShowFinalInspectPrompt] = useState(false);
  const [isFirstInspect, setIsFirstInspect] = useState<boolean | null>(null);
  
  return (
    <div className="flex flex-col h-full bg-[#f3f4f6] font-sans">
      <div className="flex-1 flex flex-col bg-white border m-2 shadow-sm overflow-y-auto">
        {/* Top Header */}
        <div className="bg-[#1e3b5f] flex justify-between items-center px-4 py-2 border-b border-[#1e3b5f] shrink-0">
          <span className="font-bold text-white text-[15px]">当前任务区</span>
          <div className="space-x-2 flex">
            <button className="bg-white/10 border border-white/20 px-3 rounded hover:bg-white/20 text-white shadow-sm leading-tight text-sm py-1">刷新</button>
            <button onClick={onBack} className="bg-white/10 border border-white/20 px-3 rounded hover:bg-white/20 text-white shadow-sm leading-tight text-sm py-1">后退</button>
          </div>
        </div>

        {/* Task Info Area */}
        <div className="bg-white p-4 border-b border-gray-400 text-black grid grid-cols-4 gap-y-3 text-[13px] shrink-0">
          {/* Row 1 */}
          <div className="flex items-center"><span className="font-bold w-20">设备名称:</span> QB001</div>
          <div className="flex items-center whitespace-nowrap"><span className="font-bold w-20 shrink-0">产品编号:</span> 
            <select className="border border-gray-400 bg-white ml-1 px-1 py-0.5 text-sm">
              <option>湘电动力25030729</option>
            </select>
          </div>
          <div className="flex items-center pl-4"><span className="font-bold w-20">产品规格:</span> 3.00*5.00</div>
          <div className="flex items-center justify-end"><span className="font-bold mr-2">最小长度:</span> <span className="w-12">1m</span></div>

          {/* Row 2 */}
          <div className="flex items-center"><span className="font-bold w-20">产品型号:</span> QQB-2/120</div>
          <div className="flex items-center"><span className="font-bold w-20">交货日期:</span> 2025-03-19</div>
          <div className="flex items-center col-span-2 pl-4">
            <span className="font-bold w-20 shrink-0">已完成量:</span> 
            <span className="mr-8">4 件 4 段 32 Kg</span>
            <span className="font-bold mr-2">已称重:</span> 
            <span>0 件 0 Kg</span>
          </div>

          {/* Row 3 */}
          <div className="flex items-center"><span className="font-bold w-20">本道工序:</span> 漆包</div>
          <div className="flex items-center"><span className="font-bold w-20">流向工序:</span> 仓库</div>
          <div className="flex items-center pl-4"><span className="font-bold w-20">派工段数:</span> 10 段</div>
          <div className="flex items-center justify-end"><span className="font-bold mr-2">开机/工艺裕量:</span> <span className="w-12">-m / 0m</span></div>

          {/* Row 4 */}
          <div className="flex items-center col-span-2"><span className="font-bold w-20">盘具型号:</span> PC200-180/200*108*132*51</div>
          <div className="flex items-center pl-4"><span className="font-bold shrink-0 mr-2">单盘长度×件数:</span> 50 米 × 10 件</div>
          <div className="flex items-center justify-end"><span className="font-bold shrink-0 mr-2">单盘重量×件数:</span> 0.13 KG × 10 件</div>

          {/* Row 5 */}
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-0.5 rounded text-xs font-bold ${task.orderStatus === '已开工' ? 'bg-green-100 text-green-700' : task.orderStatus === '已暂停' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'}`}>{task.orderStatus || '未开工'}</span>
             {task.orderStatus !== '已开工' && (
               <button onClick={onStartOrder} className="bg-[#1976d2] outline-none text-white text-xs px-2 py-0.5 rounded hover:bg-[#1565c0] shadow-sm">
                 确认开工
               </button>
             )}
             <span className={`px-2 py-0.5 rounded text-xs font-bold ${task.materialLoadStatus === '已上料' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>{task.materialLoadStatus || '未上料'}</span>
             <span className={`px-2 py-0.5 rounded text-xs font-bold ${task.moldStatus === '已上模' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>{task.moldStatus || '未上模'}</span>
          </div>
          <div className="flex items-center"><span className="font-bold w-20">当前状态:</span> 待下盘</div>
          <div className="flex items-center col-span-2 pl-4">
            <span className="font-bold w-20">当前条码:</span> 
            <span className="mr-6 tracking-wider">2503072902001016</span>
            <button className="bg-[#1976d2] hover:bg-[#1565c0] text-white px-3 py-1 rounded shadow-sm">切换产品编号</button>
          </div>
        </div>

        {/* Operation Area Header */}
        <div className="bg-[#1976d2] px-4 py-2 border-b border-[#1976d2] shrink-0">
          <span className="font-bold text-white text-[15px]">操作区</span>
        </div>

        {/* Operation Area Content */}
        <div className="flex-1 bg-white p-8 flex flex-col space-y-8">
          {/* P1 */}
          <div className="flex flex-col">
            <div className="font-bold text-gray-800 mb-3 text-[15px]">生产准备操作：</div>
            <div className="flex flex-wrap gap-x-10 gap-y-4 pl-6">
              <OpButton onClick={() => onNavigate('instruction-manual')}>作业指导书查看</OpButton>
              <OpButton>任务进度查询</OpButton>
              <OpButton onClick={() => onNavigate('material-load')}>开机上料</OpButton>
              <OpButton onClick={() => onNavigate('self-inspection')}>调试检验</OpButton>
              <OpButton onClick={() => onNavigate('material-substitute')}>替代料申请</OpButton>
            </div>
          </div>
          {/* P2 */}
          <div className="flex flex-col">
            <div className="font-bold text-gray-800 mb-3 text-[15px]">生产过程操作：</div>
            <div className="flex flex-wrap gap-x-10 gap-y-4 pl-6">
              <OpButton>换料</OpButton>
              <OpButton>焊接</OpButton>
              <OpButton onClick={() => setShowDebugPrompt(true)}>送检</OpButton>
              <OpButton onClick={() => onNavigate('patrol-inspection')}>巡回检</OpButton>
              <OpButton onClick={() => setShowFinalInspectPrompt(true)}>末盘检</OpButton>
              <OpButton onClick={() => onNavigate('production-report')}>下盘</OpButton>
              <OpButton onClick={() => onNavigate('product-handover')}>产品交班</OpButton>
            </div>
          </div>
          {/* P3 */}
          <div className="flex flex-col">
            <div className="font-bold text-gray-800 mb-3 text-[15px]">生产后续操作：</div>
            <div className="flex flex-wrap gap-x-10 gap-y-4 pl-6">
              <OpButton onClick={() => onNavigate('unload')}>下料</OpButton>
              <OpButton>退料</OpButton>
              <OpButton onClick={() => onShowMoldModal('return')}>模具归还</OpButton>
              <OpButton onClick={() => onNavigate('replenish')}>补料申请</OpButton>
              <OpButton>不合格品查询</OpButton>
              <OpButton onClick={() => onNavigate('exception-lock')}>汇报异常锁定查询</OpButton>
              <OpButton onClick={() => onNavigate('tail-weigh')}>尾料称重</OpButton>
              <OpButton onClick={() => onNavigate('standalone-weigh')}>产品实际称重</OpButton>
            </div>
          </div>
          {/* P4 */}
          <div className="flex flex-col">
            <div className="font-bold text-gray-800 mb-3 text-[15px]">废品处理操作：</div>
            <div className="flex flex-wrap gap-x-10 gap-y-4 pl-6">
              <OpButton onClick={() => onNavigate('scrap')}>废品归集</OpButton>
              <OpButton onClick={() => onNavigate('scrap-storage')}>废品入库</OpButton>
              <OpButton onClick={() => onNavigate('scrap-handover')}>交废入库</OpButton>
              <OpButton onClick={() => onNavigate('ncr')}>发起NCR</OpButton>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#fdfbbc] border-t border-gray-400 px-4 py-1 shrink-0">
          <div className="font-bold text-sm text-black">员工信息区</div>
        </div>
        <div className="bg-[#fdfbbc] flex items-center justify-between px-4 py-2 border-t border-gray-400 text-black text-[13px] font-bold shrink-0">
          <div className="flex space-x-16">
            <span>当前操作人员： 娄君</span>
            <span>登录时间： 2026/5/10 11:41:46</span>
          </div>
          <div className="flex space-x-12 items-center">
            <span>版本号： V89</span>
            <div className="flex items-center space-x-1">
              <div className="text-red-600 font-extrabold text-xl italic leading-none">G</div>
              <div className="text-red-600 font-bold tracking-tight">金杯电工</div>
              <div className="text-[8px] flex flex-col leading-none ml-0.5 text-gray-600">
                <span>GOLD CUP ELECTRIC</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showDebugPrompt && (
        <div className="fixed inset-0 bg-transparent z-50 flex items-center justify-center font-sans drop-shadow-2xl">
          <div className="bg-white border border-gray-400 w-[450px] shadow-[0_0_15px_rgba(0,0,0,0.2)] flex flex-col rounded-t-[3px] overflow-hidden">
            <div className="bg-[#1e3b5f] border-b border-[#1e3b5f] text-white px-3 py-2 text-md flex items-center tracking-wide font-medium">
              <span>送检提示</span>
            </div>
            <div className="p-6 bg-white flex flex-col items-start flex-1 min-h-[160px]">
              <div className="flex flex-row items-start space-x-4 mb-5">
                <div className="rounded-full bg-[#3587e8] text-white w-[36px] h-[36px] flex items-center justify-center font-serif text-2xl font-bold shrink-0 shadow-sm mt-0.5">i</div>
                <div className="text-[17px] text-[#111] leading-snug pt-1">
                  是否推送当前流转卡号为<br/><span className="font-bold tracking-wider">2503072902001016</span>的检验任务？
                </div>
              </div>
              
              <div className="ml-[52px] bg-[#f8f9fa] border border-gray-300 p-4 w-full rounded shadow-sm">
                <div className="mb-3 text-[15px] font-bold text-gray-800">
                  <span className="text-red-500 mr-1">*</span>请选择是否为首件检：
                </div>
                <div className="flex space-x-8 ml-2">
                  <label className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded">
                    <input 
                      type="radio" 
                      name="firstInspect" 
                      className="w-4 h-4 accent-[#0078D7] cursor-pointer"
                      checked={isFirstInspect === true}
                      onChange={() => setIsFirstInspect(true)}
                    />
                    <span className="text-[15px] font-bold text-gray-800">是</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded">
                    <input 
                      type="radio" 
                      name="firstInspect" 
                      className="w-4 h-4 accent-[#0078D7] cursor-pointer"
                      checked={isFirstInspect === false}
                      onChange={() => setIsFirstInspect(false)}
                    />
                    <span className="text-[15px] font-bold text-gray-800">否</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="bg-[#f2f2f7] px-4 py-3 flex justify-end space-x-3 border-t border-gray-300">
              <button 
                onClick={() => {
                  if (isFirstInspect === null) return;
                  setShowDebugPrompt(false);
                  setIsFirstInspect(null);
                  alert(isFirstInspect ? '已推送首件检任务' : '已推送检验任务');
                }} 
                disabled={isFirstInspect === null}
                className="bg-white border text-[14px] border-[#0078D7] hover:bg-[#e5f1fb] disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed text-black font-medium px-8 py-1.5 min-w-[85px] focus:outline-none focus:ring-1 focus:ring-[#0078D7] rounded-[2px] transition-colors"
              >
                确定
              </button>
              <button 
                onClick={() => {
                  setShowDebugPrompt(false);
                  setIsFirstInspect(null);
                }} 
                className="bg-white border text-[14px] border-gray-300 hover:border-[#0078D7] hover:bg-[#e5f1fb] text-black font-medium px-8 py-1.5 min-w-[85px] focus:outline-none focus:ring-1 focus:ring-[#0078D7] rounded-[2px]"
              >
                取消
              </button>
            </div>
          </div>
        </div>
      )}

      {showFinalInspectPrompt && (
        <div className="fixed inset-0 bg-transparent z-50 flex items-center justify-center font-sans drop-shadow-2xl">
          <div className="bg-white border border-gray-400 w-[450px] shadow-[0_0_15px_rgba(0,0,0,0.2)] flex flex-col rounded-t-[3px]">
            <div className="bg-[#1e3b5f] border-b border-[#1e3b5f] text-white px-2 py-1.5 text-md flex items-center tracking-wide font-medium">
              <span>提示</span>
            </div>
            <div className="p-6 bg-white flex flex-row items-start space-x-4 flex-1 h-[140px]">
              <div className="rounded-full bg-[#3587e8] text-white w-[36px] h-[36px] flex items-center justify-center font-serif text-2xl font-bold shrink-0 shadow-sm mt-1">i</div>
              <div className="text-[19px] text-[#111] leading-snug pt-1">
                是否推送当前流转卡号为<br/>2503072902001016的末盘检验任务？
              </div>
            </div>
            <div className="bg-[#f2f2f7] px-4 py-2.5 flex justify-end space-x-3 border-t border-gray-300">
              <button 
                onClick={() => setShowFinalInspectPrompt(false)} 
                className="bg-white border text-[14px] border-gray-300 hover:border-[#0078D7] hover:bg-[#e5f1fb] text-black font-medium px-8 py-1 min-w-[75px] focus:outline-none focus:ring-1 focus:ring-[#0078D7] rounded-[2px]"
              >
                是
              </button>
              <button 
                onClick={() => setShowFinalInspectPrompt(false)} 
                className="bg-white border text-[14px] border-[#0078D7] hover:bg-[#e5f1fb] text-black font-medium px-8 py-1 min-w-[75px] focus:outline-none focus:ring-1 focus:ring-[#0078D7] rounded-[2px]"
              >
                否
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const OpButton = ({ children, onClick, className }: { children: React.ReactNode, onClick?: () => void, className?: string }) => (
  <button onClick={onClick} className={className || "bg-[#1976d2] hover:bg-[#1565c0] text-white w-48 py-3 text-lg font-medium shadow-sm tracking-wide focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 rounded"}>
    {children}
  </button>
);

const ReplenishView = ({ task, onBack }: { task: Task, onBack: () => void }) => {
  return (
    <div className="flex flex-col h-full bg-[#e8e9eb] font-sans">
      <div className="bg-[#f0f0f0] flex justify-end items-center px-4 py-2 border-b border-gray-300 shrink-0 shadow-sm">
        <button onClick={onBack} className="bg-white border text-black px-6 py-1.5 font-bold hover:bg-gray-50 shadow-sm text-sm border-blue-400">后退</button>
      </div>

      <div className="flex-1 bg-white mx-4 mt-4 mb-4 shadow-sm border border-gray-400 overflow-hidden flex flex-col">
        {/* Info Box */}
        <div className="border border-gray-300 m-1 text-[15px] text-gray-800">
          <div className="bg-[#f8f9fa] border-b border-gray-300 py-2 px-3 font-bold tracking-wide">工单信息</div>
          <div className="grid grid-cols-3 gap-x-4 gap-y-3 p-3 font-medium bg-white">
            <div><span className="font-bold">生产订单号：</span>GXGD2403230042</div>
            <div><span className="font-bold">产品编码：</span>202010120000000132</div>
            <div><span className="font-bold">用户名：</span>陈明星</div>
            <div><span className="font-bold">派工单号：</span>{task.id}</div>
            <div><span className="font-bold">产品名称：</span>通用电缆绝缘线芯-麓谷</div>
            <div><span className="font-bold">机台：</span>3#100挤橡机</div>
            <div><span className="font-bold">型号：</span></div>
            <div><span className="font-bold">规格：</span>1.5</div>
            <div><span className="font-bold">工序：</span>{task.process}</div>
          </div>
        </div>

        {/* Table Box */}
        <div className="border border-gray-300 m-1 mt-0 flex flex-col flex-1 overflow-hidden">
          <div className="bg-[#f8f9fa] border-b border-gray-300 py-2 px-3 font-bold tracking-wide shrink-0">原料、工序产品</div>
          <div className="flex-1 overflow-auto bg-white">
            <table className="w-full text-left text-[15px]">
              <thead className="bg-[#f8f9fa] border-b border-gray-400 sticky top-0 font-bold z-10 text-gray-800">
                <tr>
                  <th className="py-2.5 px-3 font-bold whitespace-nowrap border-r border-gray-300">物料编码</th>
                  <th className="py-2.5 px-3 font-bold whitespace-nowrap border-r border-gray-300">物料名称</th>
                  <th className="py-2.5 px-3 font-bold whitespace-nowrap border-r border-gray-300">应领数量</th>
                  <th className="py-2.5 px-3 font-bold whitespace-nowrap border-r border-gray-300">已领数量</th>
                  <th className="py-2.5 px-3 font-bold whitespace-nowrap border-r border-gray-300">当前库存</th>
                  <th className="py-2.5 px-3 font-bold whitespace-nowrap border-r border-gray-300">本次申请数量</th>
                  <th className="py-2.5 px-3 font-bold whitespace-nowrap border-r border-gray-300">单位</th>
                  <th className="py-2.5 px-3 font-bold whitespace-nowrap">申请原因</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-[#0b78d0] text-white">
                  <td className="py-2 px-3 border-r border-white/20 font-bold">10200045704</td>
                  <td className="py-2 px-3 border-r border-white/20 font-bold">90℃乙丙橡皮绝缘</td>
                  <td className="py-2 px-3 border-r border-white/20 font-bold">2833.6032</td>
                  <td className="py-2 px-3 border-r border-white/20 font-bold">1056.0483</td>
                  <td className="py-2 px-3 border-r border-white/20 font-bold">48880.1529</td>
                  <td className="py-1 px-3 border-r border-white/20">
                    <input type="number" defaultValue="0" className="w-24 text-black border border-gray-400 px-1.5 py-0.5 outline-none focus:border-[#0b78d0]" />
                  </td>
                  <td className="py-2 px-3 border-r border-white/20 font-bold">千克</td>
                  <td className="py-1 px-3">
                    <select className="text-black border border-gray-300 px-1 py-0.5 outline-none bg-gradient-to-b from-white to-gray-200 min-w-[120px]">
                      <option>物料不足</option>
                      <option>物料损坏</option>
                      <option>其它</option>
                    </select>
                  </td>
                </tr>
                <tr className="bg-gray-200 min-h-[40px] h-10 border-t border-gray-400">
                  <td colSpan={8}></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-center p-4 shrink-0 bg-[#f8f9fa] border-t border-gray-400">
          <button className="bg-[#0b78d0] hover:bg-[#0962ab] text-white font-bold py-2.5 px-10 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0b78d0] tracking-widest text-[#f0f0f0]">发起申请</button>
        </div>
      </div>
    </div>
  );
};

const InstructionManualView = ({ onBack }: { onBack: () => void }) => {
  const [sopVersion, setSopVersion] = useState<string>("V1.2.0");
  const [syncStatus, setSyncStatus] = useState<'idle' | 'fetching' | 'success_no_change' | 'success_changed'>('idle');
  const [lastSyncTime, setLastSyncTime] = useState<string>("2026-06-01 08:30:12");

  const [rows, setRows] = useState([
    { project: 'Enameled appearance', name: '漆包外观', value: '漆膜应光滑、连续、无裂纹、无气块、无气孔', unit: '-', changed: false },
    { project: 'R-angle', name: 'R角', value: '0.000~1.000', unit: 'mm', changed: false },
    { project: 'Conductor thickness', name: '导体厚度', value: '0.000~1.000', unit: 'mm', changed: false },
    { project: 'Conductor width', name: '导体宽度', value: '0.000~1.000', unit: 'mm', changed: false },
    { project: 'Insulation thickness', name: '绝缘厚度', value: '0.000~1.000', unit: 'mm', changed: false },
    { project: 'Adherence', name: '附着性（15%切割拉伸）', value: '8.00', unit: 'mm', changed: false },
    { project: 'Breakdown voltage', name: '击穿电压（常温，Φ25mm）', value: '1', unit: 'V', changed: false },
    { project: 'Solubility', name: '耐溶剂（标准溶剂，1H）', value: '不刮破', unit: '-', changed: false },
  ]);

  const handleFetchSop = () => {
    setSyncStatus('fetching');
    
    setTimeout(() => {
      const nowStr = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
      setLastSyncTime(nowStr);
      
      if (sopVersion === "V1.2.0") {
        setSopVersion("V1.3.0");
        setRows([
          { project: 'Enameled appearance', name: '漆包外观', value: '漆膜应光滑、连续、无裂纹、无气孔（外观升级）', unit: '-', changed: true },
          { project: 'R-angle', name: 'R角', value: '0.000~1.000', unit: 'mm', changed: false },
          { project: 'Conductor thickness', name: '导体厚度', value: '0.000~1.250', unit: 'mm', changed: true },
          { project: 'Conductor width', name: '导体宽度', value: '0.000~1.000', unit: 'mm', changed: false },
          { project: 'Insulation thickness', name: '绝缘厚度', value: '0.000~1.100', unit: 'mm', changed: true },
          { project: 'Adherence', name: '附着性（15%切割拉伸）', value: '8.50', unit: 'mm', changed: true },
          { project: 'Breakdown voltage', name: '击穿电压（常温，Φ25mm）', value: '1.2', unit: 'V', changed: true },
          { project: 'Solubility', name: '耐溶剂（标准溶剂，1H）', value: '不刮破', unit: '-', changed: false },
        ]);
        setSyncStatus('success_changed');
      } else {
        setSyncStatus('success_no_change');
      }
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full bg-[#e8e9eb] font-sans">
      <div className="bg-[#f0f0f0] flex justify-between items-center px-4 py-2 border-b border-gray-300 shrink-0 shadow-sm">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-gray-700 text-sm">工艺规程查看</span>
        </div>
        <button onClick={onBack} className="bg-white border text-black px-6 py-1.5 font-bold hover:bg-gray-50 shadow-sm text-sm border-blue-400">后退</button>
      </div>

      {/* Manual Fetch Control Panel */}
      <div className="bg-white mx-4 mt-4 p-4 rounded shadow-sm border border-gray-300">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg shrink-0">
              <ClipboardList size={22} className="text-[#1976d2]" />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-800 flex items-center">
                当前受控工艺规格版次
              </h2>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-1 text-xs">
                <span className="text-gray-500">工艺版本:</span>
                <span className="text-sm font-mono font-bold text-[#1976d2] bg-blue-50 px-2 py-0.5 rounded border border-blue-100">{sopVersion}</span>
                <span className="text-gray-400">|</span>
                <span className="text-gray-500">本地最迟校验: {lastSyncTime}</span>
              </div>
            </div>
          </div>

          {/* Action Controls */}
          <div className="flex items-center space-x-3">
            <button
              onClick={handleFetchSop}
              disabled={syncStatus === 'fetching'}
              className={`px-4 py-2 rounded text-xs font-bold text-white shadow-sm transition-all focus:outline-none flex items-center space-x-1.5 shrink-0 ${syncStatus === 'fetching' ? 'bg-blue-400 cursor-not-allowed animate-pulse' : 'bg-[#1976d2] hover:bg-[#1565c0]'}`}
            >
              {syncStatus === 'fetching' ? (
                <>
                  <RefreshCw size={14} className="animate-spin" />
                  <span>拉取工艺数据中...</span>
                </>
              ) : (
                <>
                  <RefreshCw size={14} />
                  <span>手工获取工艺</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Dynamic Feedback Alerts */}
        {syncStatus === 'success_no_change' && (
          <div className="mt-3 p-3 bg-amber-50 border border-amber-200 text-amber-800 rounded text-xs flex items-start space-x-2 animate-in fade-in slide-in-from-top-1">
            <Info size={16} className="text-amber-600 shrink-0 mt-0.5 animate-bounce" />
            <div>
              <span className="font-bold">查询比对结果：</span>
              云端最新工艺版编为 <strong className="font-mono">{sopVersion}</strong>，与本地存储的受控工艺规格标准完全一致。<strong>工艺未发生变化，无需执行重复同步获取。</strong>
            </div>
          </div>
        )}

        {syncStatus === 'success_changed' && (
          <div className="mt-3 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded text-xs flex items-start space-x-2 animate-in fade-in slide-in-from-top-1">
            <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">获取同步成功：</span>
              检测到云端工艺规程已有更高版次 (V1.2.0 → <strong className="font-mono">{sopVersion}</strong>)！工艺版本发生变化，<strong>已更新设备物理加工规范控制限制</strong>：导体厚度、绝缘厚度、附着规格与外观标准等已在下方标绿亮显。
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 bg-white mx-4 mt-4 shadow-sm border border-gray-400 overflow-auto">
        <table className="w-full text-left border-collapse min-w-max text-[15px]">
          <thead className="bg-[#f8f9fa] border-b border-gray-400">
            <tr>
              <th className="border-r border-gray-400 w-8"></th>
              <th className="border-r border-gray-400 font-bold text-center py-2">Project</th>
              <th className="border-r border-gray-400 font-bold text-center py-2">项目</th>
              <th className="border-r border-gray-400 font-bold text-center py-2">设定值</th>
              <th className="font-bold text-center py-2">单位</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => {
              const isFirst = index === 0;
              return (
                <tr 
                  key={row.project} 
                  className={`transition-all duration-300 ${
                    row.changed 
                      ? 'bg-emerald-50 hover:bg-emerald-100/70 text-emerald-900 font-semibold' 
                      : isFirst 
                        ? 'bg-[#0b78d0] text-white hover:bg-[#0b78d0]/90' 
                        : 'border-b border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <td className={`border-r px-1 py-1.5 text-center text-xs ${
                    row.changed 
                      ? 'border-emerald-200 bg-emerald-100 text-emerald-800 font-bold' 
                      : isFirst 
                        ? 'border-white/20 bg-gray-200 text-gray-600' 
                        : 'border-gray-300 bg-gray-100'
                  }`}>
                    {isFirst ? '▶' : row.changed ? '★' : ''}
                  </td>
                  <td className={`border-r px-3 py-1.5 font-bold ${
                    row.changed 
                      ? 'border-emerald-200 text-emerald-800' 
                      : isFirst 
                        ? 'border-white/20' 
                        : 'border-gray-300'
                  }`}>
                    {row.project}
                  </td>
                  <td className={`border-r px-3 py-1.5 font-bold ${
                    row.changed 
                      ? 'border-emerald-200 text-emerald-800' 
                      : isFirst 
                        ? 'border-white/20' 
                        : 'border-gray-300'
                  }`}>
                    <div className="flex items-center space-x-2">
                      <span>{row.name}</span>
                      {row.changed && (
                        <span className="bg-emerald-600 text-white text-[10px] px-1.5 py-0.5 rounded font-normal uppercase animate-pulse">
                          已更新
                        </span>
                      )}
                    </div>
                  </td>
                  <td className={`border-r px-3 py-1.5 ${
                    row.changed 
                      ? 'border-emerald-200 text-emerald-950 font-extrabold bg-emerald-100/30' 
                      : isFirst 
                        ? 'border-white/20 font-bold' 
                        : 'border-gray-300'
                  }`}>
                    {row.value}
                  </td>
                  <td className={`px-3 py-1.5 font-bold border-b border-gray-200 ${
                    row.changed 
                      ? 'border-emerald-200 text-emerald-800' 
                      : isFirst 
                        ? 'border-[#0b78d0]' 
                        : 'border-gray-300'
                  }`}>
                    {row.unit}
                  </td>
                </tr>
              );
            })}
            <tr className="bg-gray-400 min-h-[40px] h-10 border-t border-gray-500">
              <td colSpan={5}></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

const HandoverMaterialLoadView = ({ task, onBack, onComplete }: { task: Task, onBack: () => void, onComplete: () => void }) => {
  return (
    <div className="flex flex-col h-full bg-[#f3f4f6] font-sans">
      <div className="bg-[#1e3b5f] flex justify-between items-center px-4 py-2 border-b border-[#1e3b5f] shrink-0 text-white shadow-sm">
        <span className="text-[17px] font-bold tracking-widest">接班上料</span>
        <button onClick={onBack} className="text-white hover:text-gray-200 focus:outline-none bg-blue-400 p-0.5 rounded-full shadow-inner inline-flex items-center justify-center border border-white">
          <XCircle size={22} className="text-white" />
        </button>
      </div>

      <div className="flex-1 flex flex-col bg-white border border-gray-400 m-2 shadow-sm overflow-hidden">
        {/* Dropdown area */}
        <div className="p-3 flex flex-row items-center shrink-0">
          <span className="text-[14px] font-bold mr-2 text-gray-800">请选择派工单：</span>
          {/* Dropdown look-alike matching first image */}
          <div className="relative inline-flex">
            <select className="appearance-none border border-gray-400 bg-gradient-to-b from-gray-100 to-gray-200 px-3 py-1 pr-8 text-[14px] shadow-sm select-auto outline-none w-52 focus:border-blue-500 rounded-sm font-bold text-gray-800 cursor-pointer">
              <option>{task.id.replace('PG', 'PGD')}</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 bg-gradient-to-b from-gray-200 to-gray-300 border-l border-gray-400 rounded-r-sm">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>

        {/* Table area */}
        <div className="flex-1 overflow-auto border-t-2 border-gray-800">
          <table className="w-full text-center text-[13px] border-collapse relative">
            <thead className="bg-[#f0f0f0] sticky top-0 z-10 hidden sm:table-header-group">
              <tr className="border-b-2 border-gray-800">
                <th className="py-2.5 px-2 font-black text-black tracking-wide">物料条码</th>
                <th className="py-2.5 px-2 font-black text-black tracking-wide">批号</th>
                <th className="py-2.5 px-2 font-black text-black tracking-wide">物料编号</th>
                <th className="py-2.5 px-2 font-black text-black tracking-wide">物料名称</th>
                <th className="py-2.5 px-2 font-black text-black tracking-wide">申请数量</th>
                <th className="py-2.5 px-2 font-black text-black tracking-wide">使用数量</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200 hover:bg-blue-50 bg-white">
                <td className="py-4 px-2 font-medium">00825061019474</td>
                <td className="py-4 px-2">20250610</td>
                <td className="py-4 px-2">01010200090</td>
                <td className="py-4 px-2 font-medium">圆丝</td>
                <td className="py-4 px-2">460.951</td>
                <td className="py-4 px-2">0.000</td>
              </tr>
              <tr className="border-b border-gray-200 hover:bg-blue-50 bg-white">
                <td className="py-4 px-2 font-medium">B@20260403@0002</td>
                <td className="py-4 px-2">260403</td>
                <td className="py-4 px-2">01020100001</td>
                <td className="py-4 px-2 font-medium">焊锡条60A</td>
                <td className="py-4 px-2">7.186</td>
                <td className="py-4 px-2">0.000</td>
              </tr>
              <tr className="border-b border-gray-200 hover:bg-blue-50 bg-white">
                <td className="py-4 px-2 font-medium">B@20260403@0003</td>
                <td className="py-4 px-2">260403</td>
                <td className="py-4 px-2">01020100001</td>
                <td className="py-4 px-2 font-medium">焊锡条60A</td>
                <td className="py-4 px-2">10.000</td>
                <td className="py-4 px-2">0.000</td>
              </tr>
              <tr className="border-b border-gray-200 hover:bg-blue-50 bg-white">
                <td className="py-4 px-2 font-medium">B@20260403@0004</td>
                <td className="py-4 px-2">260403</td>
                <td className="py-4 px-2">01020100001</td>
                <td className="py-4 px-2 font-medium">焊锡条60A</td>
                <td className="py-4 px-2">10.000</td>
                <td className="py-4 px-2">0.000</td>
              </tr>
              <tr className="border-b border-gray-200 hover:bg-blue-50 bg-white">
                <td className="py-4 px-2 font-medium">B@20260403@0005</td>
                <td className="py-4 px-2">260403</td>
                <td className="py-4 px-2">01020100001</td>
                <td className="py-4 px-2 font-medium">焊锡条60A</td>
                <td className="py-4 px-2">10.000</td>
                <td className="py-4 px-2">0.000</td>
              </tr>
              <tr className="border-b border-gray-200 hover:bg-blue-50 bg-white">
                <td className="py-4 px-2 font-medium">B@20260403@0006</td>
                <td className="py-4 px-2">260403</td>
                <td className="py-4 px-2">01020100001</td>
                <td className="py-4 px-2 font-medium">焊锡条60A</td>
                <td className="py-4 px-2">10.000</td>
                <td className="py-4 px-2">0.000</td>
              </tr>
            </tbody>
          </table>
          
          {/* Mock scrollbar effect to match image 1's right aligned thick scroll bar if needed, 
              but standard scrollbar is fine since we are in modern web. */}
        </div>
        
        {/* Footer */}
        <div className="flex justify-center p-4 shadow-[0_-2px_5px_rgba(0,0,0,0.05)] shrink-0 bg-[#f8f9fa] border-t border-gray-300">
          <button onClick={onComplete} className="bg-[#0b78d0] hover:bg-[#0962ab] text-white font-bold py-2 px-10 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0b78d0] tracking-widest rounded-sm text-[15px]">确认</button>
        </div>
      </div>
    </div>
  );
};

const MaterialSubstituteView = ({ task, onBack }: { task: Task, onBack: () => void }) => {
  const [substitutes, setSubstitutes] = useState([{ id: 1 }]);

  return (
    <div className="flex flex-col h-full bg-[#f3f4f6] font-sans">
      <div className="flex-1 flex flex-col bg-white border m-2 shadow-sm relative no-scrollbar overflow-x-hidden overflow-y-auto">
        
        {/* Top Header */}
        <div className="bg-[#1e3b5f] flex justify-between items-center px-4 py-3 border-b border-[#1e3b5f] shrink-0">
          <div className="flex items-center text-white space-x-2">
            <ClipboardList size={22} />
            <span className="font-bold text-lg tracking-widest">替代料申请</span>
          </div>
          <button onClick={onBack} className="bg-white hover:bg-gray-100 text-gray-800 text-sm font-bold py-1.5 px-6 rounded shadow border border-gray-300">
            后退
          </button>
        </div>

        {/* Content Area */}
        <div className="flex flex-1 overflow-hidden">
          {/* Main Form */}
          <div className="flex-1 flex flex-col overflow-y-auto p-6">

            <div className="border border-gray-300 mb-6 flex flex-col bg-gray-50">
               <div className="bg-gray-200 px-4 py-2 font-bold text-gray-800 border-b border-gray-300 text-[15px]">基本信息</div>
               <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-6">
                 <div className="flex items-center space-x-3">
                   <span className="text-gray-700 font-bold text-sm w-20 text-right">单据编号:</span>
                   <input type="text" value="自动生成" disabled className="flex-1 border border-gray-300 bg-gray-100 px-3 py-2 text-gray-500 font-bold focus:outline-none" />
                 </div>
                 <div className="flex items-center space-x-3">
                   <span className="text-gray-700 font-bold text-sm w-20 text-right"><span className="text-red-500 mr-1">*</span>派工单号:</span>
                   <input type="text" value={task.id} readOnly className="flex-1 border border-[#1976d2] bg-white px-3 py-2 text-gray-800 font-bold focus:outline-none focus:ring-1 focus:ring-[#1976d2]" />
                 </div>
                 <div className="flex items-center space-x-3">
                   <span className="text-gray-700 font-bold text-sm w-20 text-right">单据状态:</span>
                   <input type="text" value="新建 (created)" disabled className="flex-1 border border-gray-300 bg-gray-100 px-3 py-2 text-gray-500 font-bold focus:outline-none" />
                 </div>
                 <div className="flex items-center space-x-3">
                   <span className="text-gray-700 font-bold text-sm w-20 text-right">申请部门:</span>
                   <input type="text" value="制造一部" disabled className="flex-1 border border-gray-300 bg-gray-100 px-3 py-2 text-gray-500 font-bold focus:outline-none" />
                 </div>
                 <div className="flex items-center space-x-3">
                   <span className="text-gray-700 font-bold text-sm w-20 text-right">申请人:</span>
                   <input type="text" value="当前用户" disabled className="flex-1 border border-gray-300 bg-gray-100 px-3 py-2 text-gray-500 font-bold focus:outline-none" />
                 </div>
                 <div className="flex items-center space-x-3">
                   <span className="text-gray-700 font-bold text-sm w-20 text-right">申请日期:</span>
                   <input type="date" defaultValue="2026-05-15" className="flex-1 border border-gray-300 bg-white px-3 py-2 text-gray-800 font-bold focus:outline-none focus:border-[#1976d2]" />
                 </div>
               </div>
               
               <div className="px-4 pb-4">
                 <div className="flex items-center space-x-3 mb-4">
                   <span className="text-gray-700 font-bold text-sm w-20 text-right">备注:</span>
                   <input type="text" className="flex-1 border border-gray-300 bg-white px-3 py-2 text-gray-800 focus:outline-none focus:border-[#1976d2]" />
                 </div>
                 <div className="flex items-start space-x-3">
                   <span className="text-gray-700 font-bold text-sm w-20 text-right mt-2"><span className="text-red-500 mr-1">*</span>替代原因:</span>
                   <textarea rows={2} placeholder="请说明替代原因（此原因内容将作为发起OA的说明）" className="flex-1 border border-[#1976d2] bg-white px-3 py-2 text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#1976d2] resize-none"></textarea>
                 </div>
               </div>
            </div>

            <div className="border border-gray-300 flex-1 flex flex-col min-h-[250px] bg-white">
               <div className="bg-gray-200 px-4 py-2 font-bold text-gray-800 border-b border-gray-300 text-[15px] flex justify-between items-center">
                 <span>替代明细</span>
                 <div className="flex space-x-2">
                   <button onClick={() => setSubstitutes([...substitutes, { id: Date.now() }])} className="bg-white hover:bg-gray-50 text-[#1976d2] border border-gray-300 px-3 py-1 rounded text-sm shadow-sm font-bold flex items-center">
                     <Plus size={16} className="mr-1"/> 新增行
                   </button>
                   <button onClick={() => substitutes.length > 1 && setSubstitutes(substitutes.slice(0, -1))} className="bg-white hover:bg-gray-50 text-red-600 border border-gray-300 px-3 py-1 rounded text-sm shadow-sm font-bold flex items-center">
                     <Trash2 size={16} className="mr-1"/> 删除行
                   </button>
                 </div>
               </div>
               <div className="flex-1 overflow-auto">
                 <table className="w-full text-base border-collapse text-center">
                   <thead className="bg-[#f0f0f0] border-b border-gray-300 sticky top-0">
                     <tr>
                       <th className="p-2 border-r border-gray-300 w-12"><input type="checkbox" className="w-4 h-4 rounded border-gray-300" /></th>
                       <th className="p-2 border-r border-gray-300 font-bold text-gray-700"><span className="text-red-500 mr-1">*</span>被替代料编码</th>
                       <th className="p-2 border-r border-gray-300 font-bold text-gray-700">被替代料名称</th>
                       <th className="p-2 border-r border-gray-300 font-bold text-gray-700"><span className="text-red-500 mr-1">*</span>替代料编码</th>
                       <th className="p-2 border-r border-gray-300 font-bold text-gray-700">替代料名称</th>
                       <th className="p-2 border-r border-gray-300 font-bold text-[#1976d2] w-32"><span className="text-red-500 mr-1">*</span>替代数量</th>
                       <th className="p-2 border-gray-300 font-bold text-gray-700">备注</th>
                     </tr>
                   </thead>
                   <tbody>
                      {substitutes.map((sub, idx) => (
                        <tr key={sub.id} className="border-b border-gray-200 hover:bg-blue-50">
                           <td className="p-2 border-r border-gray-200 text-center"><input type="checkbox" className="w-4 h-4 rounded border-gray-300" /></td>
                           <td className="p-0 border-r border-gray-200 relative">
                             <input type="text" placeholder="扫码或输入" className="w-full py-2.5 px-2 bg-transparent focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500 text-center font-bold text-gray-800" />
                           </td>
                           <td className="p-0 border-r border-gray-200 bg-gray-50">
                             <input type="text" disabled className="w-full py-2.5 px-2 bg-transparent focus:outline-none text-center text-gray-500" />
                           </td>
                           <td className="p-0 border-r border-gray-200 relative">
                             <input type="text" placeholder="扫码或输入" className="w-full py-2.5 px-2 bg-transparent focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500 text-center font-bold text-gray-800" />
                           </td>
                           <td className="p-0 border-r border-gray-200 bg-gray-50">
                             <input type="text" disabled className="w-full py-2.5 px-2 bg-transparent focus:outline-none text-center text-gray-500" />
                           </td>
                           <td className="p-0 border-r border-gray-200">
                             <input type="number" defaultValue="0" className="w-full py-2.5 px-2 bg-transparent focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#1976d2] text-center font-bold text-[#1976d2]" />
                           </td>
                           <td className="p-0 border-gray-200">
                             <input type="text" className="w-full py-2.5 px-2 bg-transparent focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500 text-center" />
                           </td>
                        </tr>
                      ))}
                      {substitutes.length === 0 && (
                        <tr><td colSpan={7} className="text-gray-400 py-8 text-sm">暂无明细数据</td></tr>
                      )}
                   </tbody>
                 </table>
               </div>
            </div>

          </div>
          
          {/* Right Sidebar for Actions */}
          <div className="w-[280px] bg-white border-l border-gray-300 flex flex-col p-6 shrink-0 shadow-[inset_1px_0_4px_rgba(0,0,0,0.05)]">
             <div className="font-bold text-gray-800 text-lg mb-6 tracking-widest border-b border-gray-300 pb-2">操作区</div>
             
             <button className="w-full py-4 mb-4 bg-white border-2 border-gray-400 text-gray-800 font-bold text-xl tracking-widest shadow-sm rounded hover:bg-gray-50">
               刷 新
             </button>
             
             <button className="w-full py-4 mb-4 bg-[#7eb6af] hover:bg-[#6fa59e] text-white font-bold text-xl tracking-widest shadow-sm rounded border border-[#6b9d97]">
               保 存
             </button>
             
             <button className="w-full py-4 mb-4 bg-[#1976d2] hover:bg-[#1565c0] text-white font-bold text-xl tracking-widest shadow-sm rounded border border-[#0d47a1]">
               发起 OA
             </button>
             
             <div className="flex-1"></div>
             
             <button onClick={onBack} className="w-full py-4 bg-gray-500 hover:bg-gray-600 border border-gray-600 text-white font-bold text-xl tracking-widest shadow-sm rounded">
               后 退
             </button>
          </div>
        </div>

      </div>
    </div>
  );
};

const MaterialLoadView = ({ task, onBack, onComplete, onNavigate, type = 'startup' }: { task: Task, onBack: () => void, onComplete: () => void, onNavigate?: (view: string) => void, type?: 'startup' | 'handover' }) => {
  const [scanInput, setScanInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [boms, setBoms] = useState(task.bom || []);
  const [showSubstitutePrompt, setShowSubstitutePrompt] = useState(false);
  const [substitutePending, setSubstitutePending] = useState<string | null>(null);

  const title = type === 'startup' ? '开机上料' : '接班上料';

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setShowSubstitutePrompt(false);
    
    if (!scanInput.trim()) return;

    // Simulate looking up material code from barcode
    // For demo, we just treat the scan input as the material code directly
    const code = scanInput.trim();
    
    const bomIndex = boms.findIndex(b => b.materialCode === code || b.barcode === code);
    
    if (bomIndex === -1) {
      if (code === 'SUB-CU-ROUND-001') {
        setSubstitutePending(code);
        setScanInput('');
        return;
      }
      setErrorMsg(`扫描的物料条码 [${code}] 不符合当前${type === 'startup' ? '开工任务的BOM' : '接班剩余物料'}清单，请检查！`);
      setShowSubstitutePrompt(true);
      setScanInput('');
      return;
    }
    
    const matchedBom = boms[bomIndex];
    // Define maximum needed amount
    const maxNeeded = type === 'startup' ? matchedBom.requiredQty : Math.max(matchedBom.requiredQty - (matchedBom.loadedQty || 0), 5);
    const currentLoaded = matchedBom.loadedQty || 0;
    
    if (currentLoaded >= maxNeeded && type === 'startup') {
      setErrorMsg(`该物料 [${matchedBom.materialName}] 的需求数量已满。`);
      setScanInput('');
      return;
    }

    // Success, increment loaded
    const newBoms = [...boms];
    const newLoadedQty = currentLoaded + 10;
    
    newBoms[bomIndex] = { ...matchedBom, loadedQty: newLoadedQty };
    setBoms(newBoms);
    setSuccessMsg(`成功扫码匹配 [${matchedBom.materialName}] +10`);
    setScanInput('');
  };

  return (
    <div className="flex flex-col h-full bg-[#f3f4f6] font-sans">
      <div className="flex-1 flex flex-col bg-white border m-2 shadow-sm overflow-y-auto">
        <div className="bg-[#1e3b5f] flex justify-between items-center px-4 py-3 border-b border-[#1e3b5f] shrink-0">
          <div className="flex items-center text-white">
            <ScanLine className="mr-2" size={24} />
            <span className="text-xl font-bold tracking-widest">{title}</span>
          </div>
          <button onClick={onBack} className="bg-white/10 hover:bg-white/20 px-6 py-2 border border-white/30 rounded text-white shadow-sm font-bold text-lg transition-colors">
            返回任务区
          </button>
        </div>

        <div className="p-6">
          <div className="bg-[#eef2f6] border border-[#1976d2]/20 p-4 rounded-md mb-6">
        <h3 className="font-bold text-gray-800 text-lg mb-2">当前任务信息</h3>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div><span className="text-gray-500">派工单号:</span> <span className="font-medium text-gray-900">{task.id}</span></div>
          <div><span className="text-gray-500">成品质控/物料:</span> <span className="font-medium text-gray-900">{task.materialName} ({task.materialCode})</span></div>
          <div><span className="text-gray-500">工序:</span> <span className="font-medium text-gray-900">{task.process}</span></div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="flex-1">
          <h3 className="font-bold text-gray-800 text-lg mb-3 flex items-center">
            <ListChecks className="mr-2 text-gray-600" size={20} />
            {type === 'startup' ? '上料列表' : '上道派工单剩余物料'}
          </h3>
          
          {boms.length === 0 ? (
            <div className="text-gray-500 italic p-4 bg-gray-50 rounded border border-gray-200">未找到此任务的BOM清单数据</div>
          ) : (
            <table className="w-full text-sm border-collapse border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 px-3 py-2 text-left">条码</th>
                  <th className="border border-gray-300 px-3 py-2 text-left">物料编码</th>
                  <th className="border border-gray-300 px-3 py-2 text-left">物料名称</th>
                  {type === 'startup' ? (
                    <>
                      <th className="border border-gray-300 px-3 py-2 text-left">规格</th>
                      <th className="border border-gray-300 px-3 py-2 text-right">需求量</th>
                      <th className="border border-gray-300 px-3 py-2 text-right">已上料</th>
                      <th className="border border-gray-300 px-3 py-2 text-center">状态</th>
                    </>
                  ) : (
                    <>
                      <th className="border border-gray-300 px-3 py-2 text-right">数量</th>
                      <th className="border border-gray-300 px-3 py-2 text-left">单位</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {boms.map(bom => {
                  const required = type === 'startup' ? bom.requiredQty : Math.max(bom.requiredQty - bom.loadedQty, 5);
                  const loaded = type === 'startup' ? bom.loadedQty : required; // auto-fill for handover
                  
                  return (
                  <tr key={bom.id} className={loaded >= required ? 'bg-green-50' : ''}>
                    <td className="border border-gray-300 px-3 py-2 font-mono text-xs">{bom.barcode || `BC-${bom.materialCode}`}</td>
                    <td className="border border-gray-300 px-3 py-2 font-mono text-xs">{bom.materialCode}</td>
                    <td className="border border-gray-300 px-3 py-2 font-medium">{bom.materialName}</td>
                    {type === 'startup' ? (
                      <>
                        <td className="border border-gray-300 px-3 py-2">{bom.spec}</td>
                        <td className="border border-gray-300 px-3 py-2 text-right">{required} {bom.unit}</td>
                        <td className="border border-gray-300 px-3 py-2 text-right font-bold text-blue-600">
                          {loaded} {bom.unit}
                        </td>
                        <td className="border border-gray-300 px-3 py-2 text-center">
                          {loaded >= required ? (
                            <span className="text-green-600 font-bold text-xs bg-green-100 px-2 py-0.5 rounded">满足</span>
                          ) : (
                            <span className="text-orange-500 font-bold text-xs bg-orange-100 px-2 py-0.5 rounded">缺料</span>
                          )}
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="border border-gray-300 px-3 py-2 font-mono text-xs text-gray-500">
                          TX{Math.floor(Math.random() * 10000000).toString().padStart(8, '0')}
                        </td>
                        <td className="border border-gray-300 px-3 py-2 text-right font-bold text-blue-600">{required}</td>
                        <td className="border border-gray-300 px-3 py-2 text-left">{bom.unit}</td>
                      </>
                    )}
                  </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {type === 'startup' && (
          <div className="md:w-80 flex flex-col">
            <div className="bg-gray-50 border border-gray-300 p-5 flex-1 shadow-inner relative">
              <h3 className="font-bold text-gray-800 text-base mb-4 flex items-center">
                <Barcode className="mr-2" size={20} />
                扫码上料
              </h3>
              
              <form onSubmit={handleScan} className="flex flex-col space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">请使用扫码枪扫描物料条码</label>
                  <input 
                    type="text" 
                    value={scanInput}
                    onChange={(e) => setScanInput(e.target.value)}
                    placeholder="扫描或输入物料编码..."
                    className="w-full border-2 border-blue-400 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg shadow-sm font-mono"
                    autoFocus
                  />
                </div>
                <button type="submit" className="bg-[#1976d2] hover:bg-[#1565c0] text-white font-bold py-3 rounded shadow-md w-full tracking-wider transition-colors">
                  确认投料
                </button>
              </form>

              <div className="mt-6">
                {errorMsg && (
                  <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
                    <p className="font-bold flex items-center">
                       <AlertTriangle className="mr-2" size={20} />
                       错误提示
                    </p>
                    <p className="text-sm mt-1">{errorMsg}</p>
                    {showSubstitutePrompt && onNavigate && (
                      <div className="mt-4 border-t border-red-200 pt-3 flex flex-col sm:flex-row sm:items-center justify-between">
                         <span className="text-sm font-medium mb-2 sm:mb-0">是否要做替代料申请？</span>
                         <button 
                           onClick={() => onNavigate('material-substitute')}
                           className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded shadow text-sm font-bold w-fit"
                         >
                           去申请替代料
                         </button>
                      </div>
                    )}
                  </div>
                )}
                {successMsg && (
                  <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded">
                    <p className="font-bold flex items-center">
                       <CheckCircle2 className="mr-2" size={20} />
                       投料成功
                    </p>
                    <p className="text-sm mt-1">{successMsg}</p>
                  </div>
                )}
                
                {!errorMsg && !successMsg && (
                  <div className="text-gray-400 text-sm italic mt-4">
                    提示: 可以输入 {boms?.[0]?.barcode || boms?.[0]?.materialCode || 'MA1001'} 进行正常上料，输入 SUB-CU-ROUND-001 体验确认替代料逻辑，或其他条码模拟扫描报错并体验替代料申请。
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {substitutePending && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-sm flex flex-col">
             <div className="p-5 border-b border-gray-100 flex items-center">
               <AlertTriangle className="text-orange-500 mr-2" size={24} />
               <h3 className="text-xl font-bold text-gray-800">替代料确认</h3>
             </div>
             <div className="p-6">
                <p className="text-gray-700 text-base">
                  您扫描的条码 [<span className="font-mono font-bold text-black">{substitutePending}</span>] 为替代料。
                </p>
                <p className="text-gray-700 text-base mt-2">
                  是否继续上料？
                </p>
             </div>
             <div className="p-4 border-t border-gray-100 flex justify-end space-x-3 bg-gray-50">
               <button 
                 onClick={() => setSubstitutePending(null)}
                 className="px-4 py-2 border border-gray-300 rounded bg-white text-gray-700 hover:bg-gray-50 font-medium"
               >
                 取消
               </button>
               <button 
                 onClick={() => {
                   setSuccessMsg(`扫描条码 [${substitutePending}] 投料成功 (作为替代料)。`);
                   setSubstitutePending(null);
                 }}
                 className="px-4 py-2 rounded bg-[#1976d2] text-white hover:bg-[#1565c0] font-medium shadow-sm transition-colors"
               >
                 确认继续
               </button>
             </div>
          </div>
        </div>
      )}

      <div className="border-t border-gray-300 p-4 bg-[#f3f4f6] flex justify-end space-x-4 shrink-0">
        {type === 'startup' && (
          <button className="bg-white hover:bg-gray-50 px-8 py-3 rounded font-bold text-gray-700 border border-gray-300">清空已扫</button>
        )}
         <button 
           className="bg-[#1976d2] hover:bg-[#1565c0] px-10 py-3 rounded font-bold text-white shadow"
           onClick={() => {
             alert(`${title}确认成功！`);
             onComplete();
           }}
         >
           完成{title}
         </button>
      </div>
      </div>
    </div>
    </div>
  );
};

const ProductionReportView = ({ task, onBack }: { task: Task, onBack: () => void }) => {
  const [activeTab, setActiveTab] = useState<'workers' | 'self-inspect' | 'report'>('report');
  
  const defaultTaskOrder = task.taskOrderNo || task.id.replace('PG', 'RW');
  const [selectedTaskOrders, setSelectedTaskOrders] = useState<string[]>([defaultTaskOrder]);
  const [showTaskOrderSelect, setShowTaskOrderSelect] = useState(false);
  
  const [reportLength, setReportLength] = useState<number | ''>('');
  const [meterWeight, setMeterWeight] = useState<number | ''>(0.0109); // Default meter weight for demonstration
  
  const calculatedWeight = (typeof reportLength === 'number' && typeof meterWeight === 'number') ? (reportLength * meterWeight).toFixed(2) : '';

  return (
    <div className="flex flex-col h-full bg-[#f3f4f6] font-sans">
      <div className="bg-[#1e3b5f] text-white flex items-center px-4 py-3 shrink-0">
        <button onClick={onBack} className="p-1 hover:bg-white/10 rounded mr-2">
          <ChevronLeft size={24} />
        </button>
        <span className="text-lg font-bold">报工</span>
      </div>

      <div className="flex-1 overflow-y-auto w-full max-w-6xl mx-auto flex flex-col p-4">
        {/* Header Tabs */}
        <div className="flex items-end justify-start border-b border-[#1976d2] mt-4 z-10 relative left-10">
          <button 
            onClick={() => setActiveTab('workers')}
            className={`px-8 py-3 font-medium text-[15px] border-t border-l border-r rounded-t bg-white ${activeTab === 'workers' ? 'bg-[#1976d2] text-white border-[#1976d2]' : 'text-gray-600 border-gray-200 hover:bg-gray-50'}`}
          >
            作业人员
          </button>
          <button 
            onClick={() => setActiveTab('self-inspect')}
            className={`px-8 py-3 font-medium text-[15px] border-t border-r rounded-t bg-white ${activeTab === 'self-inspect' ? 'bg-[#1976d2] text-white border-[#1976d2]' : 'text-gray-600 border-gray-200 hover:bg-gray-50'}`}
          >
            自检信息
          </button>
          <button 
            onClick={() => setActiveTab('report')}
            className={`px-8 py-3 font-medium text-[15px] border-t border-r rounded-t bg-[#1976d2] text-white ${activeTab === 'report' ? 'bg-[#1976d2] text-white border-[#1976d2]' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
          >
            生产汇报
          </button>
        </div>

        <div className="bg-white p-8 border border-t-0 shadow-sm pt-10">
          {activeTab === 'report' && (
            <div className="grid grid-cols-2 gap-x-12 gap-y-6">
              {/* Row 1 */}
              <div className="flex items-center">
                <label className="w-28 text-right mr-4 text-gray-700 font-medium text-sm">批次号</label>
                <div className="flex-[2] relative">
                  <input type="text" defaultValue="PG20260400047" className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-50 focus:outline-none focus:border-[#1976d2] focus:bg-white" />
                </div>
              </div>
              <div className="flex items-center">
                <label className="w-28 text-right mr-4 text-gray-700 font-medium text-sm">派工单号</label>
                <div className="flex-[2]">
                  <input type="text" defaultValue="PG20260400047" className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-50 focus:outline-none focus:border-[#1976d2] focus:bg-white" />
                </div>
              </div>
              
              {/* Row 2 */}
              <div className="flex items-center">
                <label className="w-28 text-right mr-4 text-gray-700 font-medium text-sm">物料编号</label>
                <div className="flex-[2]">
                  <input type="text" defaultValue="MA00031" className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-50 focus:outline-none focus:border-[#1976d2] focus:bg-white" />
                </div>
              </div>
              <div className="flex items-center">
                <label className="w-28 text-right mr-4 text-gray-700 font-medium text-sm">物料名称</label>
                <div className="flex-[2]">
                  <input type="text" defaultValue="聚酯亚胺漆包铜圆线" className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-50 focus:outline-none focus:border-[#1976d2] focus:bg-white" />
                </div>
              </div>

              {/* Row 3 */}
              <div className="flex items-center">
                <label className="w-28 text-right mr-4 text-gray-700 font-medium text-sm">规格</label>
                <div className="flex-[2]">
                  <input type="text" defaultValue="1.25mm" className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-50 focus:outline-none focus:border-[#1976d2] focus:bg-white" />
                </div>
              </div>
              <div className="flex items-center">
                <label className="w-28 text-right mr-4 text-gray-700 font-medium text-sm">型号</label>
                <div className="flex-[2]">
                  <input type="text" defaultValue="QZY-2/180" className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-50 focus:outline-none focus:border-[#1976d2] focus:bg-white" />
                </div>
              </div>

              {/* Row 4 */}
              <div className="flex items-center">
                <label className="w-28 text-right mr-4 text-gray-700 font-medium text-sm">计划数量</label>
                <div className="flex-[2]">
                  <input type="text" defaultValue="2000" className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-50 focus:outline-none focus:border-[#1976d2] focus:bg-white" />
                </div>
              </div>
              <div className="flex items-center">
                <label className="w-28 text-right mr-4 text-gray-700 font-medium text-sm">派工数量</label>
                <div className="flex-[2]">
                  <input type="text" defaultValue="1000" className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-50 focus:outline-none focus:border-[#1976d2] focus:bg-white" />
                </div>
              </div>

              {/* Row 5 */}
              <div className="flex items-center">
                <label className="w-28 text-right mr-4 text-gray-700 font-medium text-sm">工序</label>
                <div className="flex-[2]">
                  <input type="text" defaultValue="漆包" className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-50 focus:outline-none focus:border-[#1976d2] focus:bg-white" />
                </div>
              </div>

              {/* Row 6 */}
              <div className="flex items-center">
                <label className="w-28 text-right mr-4 text-gray-700 font-medium text-sm">单位</label>
                <div className="flex-[2]">
                  <input type="text" defaultValue="kg" className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-50 focus:outline-none focus:border-[#1976d2] focus:bg-white" />
                </div>
              </div>
              <div className="flex items-center">
                <label className="w-28 text-right mr-4 text-gray-700 font-medium text-sm">实际生产设备</label>
                <div className="flex-[2] relative">
                  <input type="text" defaultValue="测试机B" className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-50 focus:outline-none focus:border-[#1976d2] focus:bg-white" />
                </div>
              </div>

              {/* Row 7 */}
              <div className="flex items-center">
                <label className="w-28 text-right mr-4 text-[#1976d2] font-bold text-sm">盘具信息</label>
                <div className="flex-[2]">
                  <input type="text" placeholder="请输入/选择盘具编号" className="w-full border border-[#1976d2]/50 rounded px-3 py-2 focus:outline-none focus:border-[#1976d2] focus:ring-1 focus:ring-[#1976d2] bg-white transition-shadow" />
                </div>
              </div>
              
              {/* Row: Task details */}
              <div className="col-span-2 mt-4 mb-2 bg-[#f0f7ff] p-4 rounded-lg border border-[#a1c4fd]">
                <div className="flex justify-between items-center mb-4 relative">
                  <div className="font-bold text-[#1976d2] flex items-center">
                    <ListChecks size={18} className="mr-2" />
                    任务单明细选择
                  </div>
                  <div className="relative">
                    <button 
                      onClick={() => setShowTaskOrderSelect(!showTaskOrderSelect)}
                      className="text-sm bg-white px-3 py-1.5 rounded-md border border-[#1976d2] hover:border-[#1565c0] shadow-sm flex items-center transition-colors"
                    >
                      <span className="text-gray-500 mr-2">已选任务单号:</span>
                      <span className="text-[#1976d2] font-mono font-bold truncate max-w-[150px]">
                        {selectedTaskOrders.length > 0 ? selectedTaskOrders.join(', ') : '未选择'}
                      </span>
                      <ChevronDown size={14} className="ml-2 text-gray-500" />
                    </button>
                    {showTaskOrderSelect && (
                      <div className="absolute right-0 top-full mt-1 w-64 bg-white border border-[#a1c4fd] shadow-lg rounded-md z-20 py-1">
                        {[defaultTaskOrder, 'RW20260400051', 'RW20260400052'].map(orderNo => (
                          <label key={orderNo} className="flex items-center px-4 py-2 hover:bg-blue-50 cursor-pointer">
                            <input 
                              type="checkbox" 
                              checked={selectedTaskOrders.includes(orderNo)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedTaskOrders([...selectedTaskOrders, orderNo]);
                                } else {
                                  setSelectedTaskOrders(selectedTaskOrders.filter(id => id !== orderNo));
                                }
                              }}
                              className="w-4 h-4 text-[#1976d2] border-gray-300 rounded focus:ring-[#1976d2]"
                            />
                            <span className="ml-3 text-sm font-mono text-gray-700">{orderNo}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="bg-white rounded-md border border-gray-200 p-4 shadow-sm flex justify-between items-center">
                  <div>
                     <div className="font-bold text-gray-800 text-[14px]">{task.materialName}加工 [明细-01]</div>
                     <div className="text-sm text-gray-500 mt-1">
                        工序: <span className="font-medium text-gray-700">{task.process}</span> | 
                        规格: <span className="font-medium text-gray-700">{task.spec}</span>
                     </div>
                  </div>
                  <div className="text-right">
                     <div className="text-[14px] font-bold text-gray-700">需报: {task.dispatchQty * selectedTaskOrders.length} kg</div>
                     <div className="text-sm text-green-600 font-medium">已报: 0 kg</div>
                  </div>
                </div>
              </div>

              {/* Rows: Report Quantity and Measurements */}
              <div className="flex items-center">
                <label className="w-28 text-right mr-4 text-[#1976d2] font-bold text-sm">汇报数量</label>
                <div className="flex-[2]">
                  <input 
                    type="number" 
                    placeholder="请输入汇报数量" 
                    className="w-full border border-[#1976d2]/50 rounded px-3 py-2 focus:outline-none focus:border-[#1976d2] focus:ring-1 focus:ring-[#1976d2] bg-white transition-shadow" 
                  />
                </div>
              </div>
              <div className="flex items-center">
                <label className="w-28 text-right mr-4 text-[#1976d2] font-bold text-sm">汇报长度(m)</label>
                <div className="flex-[2]">
                  <input 
                    type="number" 
                    value={reportLength} 
                    onChange={(e) => setReportLength(e.target.value ? Number(e.target.value) : '')}
                    placeholder="输入长度" 
                    className="w-full border border-[#1976d2]/50 rounded px-3 py-2 focus:outline-none focus:border-[#1976d2] focus:ring-1 focus:ring-[#1976d2] bg-white transition-shadow" 
                  />
                </div>
              </div>

              <div className="flex items-center">
                <label className="w-28 text-right mr-4 text-gray-700 font-medium text-sm">米重量(kg/m)</label>
                <div className="flex-[2]">
                  <input 
                    type="number" 
                    value={meterWeight} 
                    onChange={(e) => setMeterWeight(e.target.value ? Number(e.target.value) : '')}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#1976d2] focus:ring-1 focus:ring-[#1976d2] bg-white transition-shadow" 
                  />
                </div>
              </div>
              <div className="flex items-center">
                <label className="w-28 text-right mr-4 text-gray-500 font-medium text-sm">计算重量(kg)</label>
                <div className="flex-[2]">
                  <input 
                    type="text" 
                    value={calculatedWeight} 
                    disabled
                    className="w-full border border-gray-200 rounded px-3 py-2 bg-gray-100 text-gray-600 font-bold" 
                  />
                </div>
              </div>

              <div className="flex items-center">
                <label className="w-28 text-right mr-4 text-red-600 font-bold text-sm">称重重量录入(kg)</label>
                <div className="flex-[2]">
                  <input 
                    type="number" 
                    placeholder="输入实际称重" 
                    className="w-full border border-red-300 rounded px-3 py-2 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 bg-red-50/30 transition-shadow font-bold text-red-700 placeholder:text-red-300" 
                  />
                </div>
              </div>
              <div className="flex items-center">
                {/* Empty block to fill grid */}
              </div>
            </div>
          )}
          
          {/* Footer actions for this tab */}
          {activeTab === 'report' && (
            <div className="mt-12 flex justify-center border-t border-gray-100 pt-6">
              <button onClick={onBack} className="bg-[#1976d2] hover:bg-[#1565c0] text-white px-20 py-3 rounded text-lg shadow transition-colors tracking-widest font-bold">
                确认汇报
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ProductHandoverView = ({ task, onBack, onNavigate }: { task: Task, onBack: () => void, onNavigate?: (view: string) => void }) => {
  const [qualifyStatus, setQualifyStatus] = useState<boolean>(true);
  const [isTaskCompleted, setIsTaskCompleted] = useState<boolean>(false);
  
  const [handoverWorkers] = useState([
    { name: '张三', id: 'A043', hours: 8 },
    { name: '李四', id: 'A129', hours: 8 }
  ]);

  return (
    <div className="flex flex-col h-full bg-white font-sans text-sm">
      <div className="flex-1 flex overflow-hidden">
        {/* Left/Main Content */}
        <div className="flex-1 flex flex-col p-4 overflow-y-auto no-scrollbar space-y-4 pr-6">
          {/* Handover Personnel */}
          <div className="border border-gray-300">
            <div className="bg-[#f8f9fa] border-b border-gray-300 px-4 py-2 font-bold text-[#1e3b5f] flex items-center">
              <User size={20} className="mr-2" /> 
              <span>交接班人员 (Handover Personnel)</span>
            </div>
            <div className="p-3 flex space-x-4 items-center bg-white flex-wrap gap-y-2">
              <div className="relative">
                <Search size={16} className="absolute left-2 top-2 text-gray-400" />
                <input type="text" placeholder="输入员工姓名或工号进行添加" className="pl-8 pr-2 py-1.5 border border-gray-300 focus:outline-none focus:border-blue-400 w-64" />
              </div>
              
              {handoverWorkers.map((worker, i) => (
                <div key={i} className="flex items-center bg-gray-100 border border-gray-200 text-[#333]">
                  <div className="px-3 py-1.5 font-bold border-r border-gray-200 bg-gray-200">
                    {worker.name} ({worker.id})
                  </div>
                  <div className="flex items-center px-2 py-1.5">
                    <span className="text-gray-600 mr-2 text-[13px]">上班时长:</span>
                    <input type="number" defaultValue={worker.hours} className="w-12 border border-gray-300 text-center mx-1 py-1 bg-white text-[13px]" />
                    <span className="text-gray-600 ml-1 text-[13px]">h</span>
                  </div>
                  <button className="px-3 py-1.5 text-red-600 hover:bg-red-50 font-medium border-l border-gray-200 flex flex-col items-center justify-center">
                    关闭
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Item Checklist */}
          <div className="border border-gray-300">
            <div className="bg-[#eaeaea] border-b border-gray-300 px-4 py-2 font-bold text-gray-800 text-[13px]">
              项目清单 (Item Checklist)
            </div>
            <table className="w-full text-[13px] border-collapse bg-white">
              <thead className="bg-[#f8f9fa] border-b border-gray-300">
                <tr>
                  <th className="border-r border-gray-300 px-3 py-2 text-left font-bold text-gray-700 w-48">项目</th>
                  <th className="border-r border-gray-300 px-3 py-2 text-left font-bold text-gray-700 w-24">单位</th>
                  <th className="border-r border-gray-300 px-3 py-2 text-left font-bold text-gray-700 w-32">判定方法</th>
                  <th className="border-r border-gray-300 px-3 py-2 text-left font-bold text-gray-700">取值要求</th>
                  <th className="px-3 py-2 text-left font-bold text-gray-700 w-48">检测值</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="border-r border-gray-300 p-0 bg-[#dde3fb] text-[#1e3b5f]">
                    <div className="flex items-center px-4 py-6 font-medium">
                       <ChevronRight size={20} className="mr-2 text-[#3b5b9c]" />
                       <div className="leading-tight tracking-widest text-[#2c407a]">漆包<br/>外观</div>
                    </div>
                  </td>
                  <td className="border-r border-gray-300 px-3 py-2 text-gray-800">-</td>
                  <td className="border-r border-gray-300 px-3 py-2 text-gray-800">定性</td>
                  <td className="border-r border-gray-300 px-3 py-2 text-gray-800">漆膜应光滑、连续...</td>
                  <td className="border-gray-300 px-3 py-2"><input type="text" placeholder="请输入..." className="w-full border border-gray-300 px-2 py-1.5 focus:outline-none focus:border-blue-400 bg-white" /></td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="border-r border-gray-300 px-4 py-3 text-gray-800 bg-gray-50">
                    性能测试
                  </td>
                  <td className="border-r border-gray-300 px-3 py-2 text-gray-800">V</td>
                  <td className="border-r border-gray-300 px-3 py-2 text-gray-800">定量</td>
                  <td className="border-r border-gray-300 px-3 py-2 text-gray-800">&gt;= 1200V</td>
                  <td className="border-gray-300 px-3 py-2"><input type="text" placeholder="输入测量值" className="w-full border border-gray-300 px-2 py-1.5 focus:outline-none focus:border-blue-400 bg-white" /></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex space-x-4">
            {/* Disc Information */}
            <div className="border border-gray-300 flex flex-col bg-white w-2/3">
              <div className="font-bold text-gray-800 px-4 py-3 border-b border-gray-200 text-[13px]">
                盘具信息 (Disc Information)
              </div>
              <div className="p-4 grid grid-cols-2 gap-x-6 gap-y-4 text-gray-800 text-[13px]">
                <div className="flex flex-col space-y-1 relative">
                  <label className="font-bold">盘具条码录入：</label>
                  <input type="text" placeholder="请输入条码" className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:border-blue-400" />
                </div>
                <div className="flex flex-col space-y-1">
                  <label className="font-bold">盘具编号：</label>
                  <input type="text" defaultValue="自动获取编号" disabled className="w-full border border-gray-300 px-3 py-2 bg-gray-100 text-gray-500" />
                </div>
                <div className="flex flex-col space-y-1">
                  <label className="font-bold">码数：</label>
                  <input type="text" defaultValue="0" className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:border-blue-400" />
                </div>
                <div className="flex flex-col space-y-1">
                  <label className="font-bold">盘具重量：</label>
                  <div className="relative">
                    <input type="text" defaultValue="0.00" className="w-full border border-gray-300 px-3 py-2 pr-10 focus:outline-none focus:border-blue-400" />
                    <span className="absolute right-3 top-2 font-bold select-none text-gray-600">KG</span>
                  </div>
                </div>
              </div>
              <div className="px-5 pb-5 pt-1 flex space-x-8 mt-auto">
                <label className="flex items-center space-x-1.5 cursor-pointer font-medium text-gray-700 text-[13px]">
                  <input type="checkbox" className="w-3.5 h-3.5 accent-[#1976d2] rounded-sm" />
                  <span>开机线</span>
                </label>
                <label className="flex items-center space-x-1.5 cursor-pointer font-medium text-gray-700 text-[13px]">
                  <input type="checkbox" className="w-3.5 h-3.5 accent-[#1976d2] rounded-sm" />
                  <span>导线修复</span>
                </label>
                <label className="flex items-center space-x-1.5 cursor-pointer font-medium text-gray-700 text-[13px]">
                  <input type="checkbox" className="w-3.5 h-3.5 accent-[#1976d2] rounded-sm" />
                  <span>高精模具</span>
                </label>
              </div>
            </div>

             {/* Material Batch */}
             <div className="border border-gray-300 flex flex-col bg-white w-1/3">
                <div className="font-bold text-gray-800 px-4 py-3 border-b border-gray-200 text-[13px]">
                  生产批次 (Material Batch)
                </div>
                <div className="p-4 flex-1 flex flex-col space-y-6 text-[13px]">
                  <div className="flex flex-col space-y-1 text-gray-800">
                    <label className="font-bold">主要材料批次:</label>
                    <input type="text" className="w-full border border-gray-300 focus:outline-none focus:border-blue-400 px-3 py-2" />
                  </div>
                  <div className="bg-[#fdebea] text-[#d32f2f] flex space-x-2 p-3 border border-transparent rounded-sm items-start">
                    <AlertTriangle size={16} className="mt-0.5 shrink-0" />
                    <span className="text-[13px] font-medium tracking-wide">此盘线在线检测系统无报<br/>警，可输入长度</span>
                  </div>
                </div>
             </div>
          </div>
          
          <div className="mt-4 pt-2 pb-6">
             <button onClick={() => { alert("确认成功！"); onBack(); }} className="w-full bg-[#025da6] hover:bg-[#024982] text-white py-3 border-none text-[18px] tracking-[0.2em] font-medium transition-colors rounded-sm shadow-sm cursor-pointer">
               确 定 (Confirm)
             </button>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-80 bg-[#f7f8fa] p-5 flex flex-col items-start shrink-0 border-l border-gray-300 relative shadow-sm">
          <div className="w-full text-[13px] font-bold mb-3 text-gray-800">检验结果：</div>
          
          <div className="w-full mb-4">
            <button 
              className={`w-full py-8 text-white hover:opacity-90 transition-colors shadow-sm cursor-pointer flex flex-col items-center justify-center space-y-1 rounded-[2px] ${qualifyStatus ? 'bg-[#00c853]' : 'bg-[#e53935]'} border-none`}
              onClick={() => setQualifyStatus(!qualifyStatus)}
            >
              <div className="text-[32px] font-bold tracking-[0.3em] mb-1">{qualifyStatus ? '合 格' : '不合格'}</div>
              <div className="text-[10px] tracking-wider uppercase font-medium">{qualifyStatus ? 'QUALIFIED' : 'UNQUALIFIED'}</div>
            </button>
          </div>

          <button 
            className="w-full py-2.5 mb-8 bg-[#ff6d00] hover:bg-[#e65100] text-white flex items-center justify-center space-x-2 shadow-sm transition-colors cursor-pointer rounded-[2px] border-none"
            onClick={() => onNavigate && onNavigate('ncr')}
          >
            <AlertTriangle size={18} />
            <span className="font-bold tracking-wide text-[14px]">发起NCR</span>
          </button>

          <div className="w-full text-[13px] font-bold mb-1.5 text-gray-800">不合格代码：</div>
          <div className="w-full relative mb-6">
            <input type="text" placeholder="输入异常代码..." className="w-full border border-gray-300 px-3 py-2 text-[13px] bg-white focus:outline-none focus:border-blue-400 placeholder:text-gray-400 rounded-sm" />
          </div>

          <div className="w-full text-[13px] font-bold mb-1.5 text-gray-800">长度信息录入：</div>
          <div className="w-full relative mb-10">
            <input type="text" className="w-full border border-gray-300 px-3 py-2 pr-8 text-[13px] bg-white focus:outline-none focus:border-blue-400 rounded-sm" />
            <span className="absolute right-3 top-2.5 text-gray-500 font-bold text-[13px]">M</span>
          </div>

          <div className="w-full bg-[#ebebeb] border border-[#d0d0d0] border-dashed px-4 py-3 flex items-center cursor-pointer hover:bg-[#e0e0e0] transition-colors rounded-[2px] mb-8" onClick={() => setIsTaskCompleted(!isTaskCompleted)}>
            <input type="checkbox" className="w-4 h-4 mr-3 accent-gray-500 rounded-sm border-gray-400 bg-white" checked={isTaskCompleted} readOnly />
            <span className="text-[13px] font-bold text-gray-700 select-none tracking-wide">此派工任务已完成</span>
          </div>
          
          <div className="absolute right-0 top-0 bottom-0 w-[4px] border-l border-[#ececec] border-dashed opacity-50 flex flex-col justify-between py-2">
            {[...Array(50)].map((_, i) => (
              <div key={i} className="w-1 h-1 bg-gray-200 rounded-full mx-auto" />
            ))}
          </div>

          <div className="mt-auto w-full pt-6 pb-2 border-t border-gray-300 flex flex-col items-center">
            <div className="text-[11px] text-[#90a4ae] font-bold mb-2 tracking-wide scale-y-110">System Version 4.2.1-PRO</div>
            <div className="flex space-x-3 text-[#2c407a] text-[15px] tracking-wide">
              <span className="hover:underline cursor-pointer font-medium px-1">打印</span>
              <span className="hover:underline cursor-pointer font-medium px-1">分享</span>
              <span className="hover:underline cursor-pointer font-medium px-1">历史</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

const NCRIssueView = ({ task, onBack }: { task: Task, onBack: () => void }) => {
  const inspectionItems = [
    { name: '介损(第一拐点)', en: 'Dielectric...', condition: '0≤值≤0', standard: '315.0~340.0', value: '320.7' },
    { name: '盐水针孔(12V, 5m)', en: 'Saline Pu...', condition: '≤', standard: '0', value: '0.0' },
    { name: '软化击穿(升温法)', en: 'Cut throu...', condition: '≥', standard: '450.0', value: '455.0' },
    { name: '高压针孔(2000V, 12μA)', en: 'online test', condition: '≤', standard: '2', value: '0' },
    { name: '热冲击(260℃, 6a, 180°弯曲, 30min)', en: 'Heat shock', condition: '=', standard: '不开裂', value: 'OK' },
    { name: '高低温冲击(空气介质)', en: 'High and ...', condition: '=', standard: 'OK', value: 'OK' },
    { name: '焊锡(420℃, 30S)', en: 'soldering ...', condition: '=', standard: '漆膜不鼓泡不变色', value: 'OK' },
    { name: '温度指数', en: 'temperat...', condition: '≥', standard: '240', value: '' },
    { name: '耐溶剂', en: 'Solubility', condition: '≥', standard: '1', value: '7.0' },
  ];

  return (
    <div className="flex flex-col h-full font-sans bg-white p-2">
      <div className="flex-1 flex flex-col relative no-scrollbar overflow-hidden border border-gray-400 bg-white shadow-md">
        
        {/* Top Header */}
        <div className="flex justify-between items-center px-4 py-3 shrink-0">
           <div className="flex items-center space-x-2">
             <div className="text-red-700 font-bold italic tracking-tighter text-3xl">G</div>
             <div className="font-bold text-gray-700 text-xl font-serif">金杯电工</div>
             <div className="text-gray-700 text-sm font-bold ml-6">生产设备: <span className="text-gray-900 border-b border-gray-400 px-1">QB152</span></div>
           </div>
           
           <div className="flex space-x-2 items-center">
             <button onClick={onBack} className="bg-white hover:bg-gray-100 border border-gray-400 px-4 py-1.5 shadow-sm text-gray-700 text-sm font-medium">后退</button>
           </div>
        </div>

        {/* Content Area */}
        <div className="flex flex-1 overflow-hidden px-8 pb-4 pt-2">
          
          <div className="flex-1 pb-4 flex flex-col relative">
             <div className="grid grid-cols-3 gap-y-4 mb-4 text-gray-800 font-bold text-sm tracking-wide">
               <div>客户名称: <span className="font-normal text-black ml-1">朗高电机</span></div>
               <div>产品编号: <span className="font-normal text-black ml-1">26040469</span></div>
               <div>产品型号: <span className="font-normal text-black ml-1">QY(F)PB-3/240</span></div>
               
               <div>产品规格: <span className="font-normal text-black ml-1">2.22*3.20</span></div>
               <div>流转卡号: <span className="font-normal text-black ml-1">2604046902001019</span></div>
               <div>执行标准: <span className="font-normal text-black ml-1">客户标准</span></div>
               
               <div className="col-span-3">备注: <span className="font-normal text-black ml-1">-</span></div>
             </div>

             <div className="flex-1 border border-gray-400 overflow-y-auto bg-white flex flex-col relative shadow">
                <table className="w-full text-[15px] border-collapse bg-white">
                   <thead className="sticky top-0 bg-gray-100 outline outline-1 outline-gray-400 z-10 font-bold border-b border-gray-400 text-gray-800">
                     <tr>
                       <th className="px-2 py-3 text-left w-[30%]">项目</th>
                       <th className="px-2 py-3 text-left w-32 border-l border-gray-400">Project</th>
                       <th className="px-2 py-3 text-left w-24 border-l border-gray-400">取值符号</th>
                       <th className="px-2 py-3 text-left border-l border-gray-400">标定值</th>
                       <th className="px-2 py-3 text-left w-24 border-l border-gray-400 bg-gray-200 flex items-center justify-between">
                         <div className="flex flex-col items-center"><span>检测</span><span>值</span></div>
                       </th>
                     </tr>
                   </thead>
                   <tbody>
                     {inspectionItems.map((item, idx) => (
                       <tr key={idx} className={`border-b border-gray-400/50 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} text-black font-medium`}>
                         <td className="px-2 py-2.5 border-r border-gray-400/50">{item.name}</td>
                         <td className="px-2 py-2.5 text-sm border-r border-gray-400/50 font-bold">{item.en}</td>
                         <td className="px-2 py-2.5 text-sm border-r border-gray-400/50">{item.condition}</td>
                         <td className="px-2 py-2.5 text-sm font-bold border-r border-gray-400/50">{item.standard}</td>
                         <td className="px-0 py-0 bg-white/50 h-full relative">
                            <input type="text" defaultValue={item.value} className="w-full h-full p-2 bg-transparent focus:bg-white focus:outline-none absolute inset-0 font-bold text-black" />
                         </td>
                       </tr>
                     ))}
                   </tbody>
                </table>
             </div>
          </div>
          
          <div className="w-[320px] flex flex-col pl-10 pr-4 pt-8 shrink-0">
             <button className="w-full py-4 bg-[#7eb6af] hover:bg-[#6fa59e] mt-4 mb-20 shadow text-gray-800 font-bold text-2xl tracking-widest border border-gray-400/50">
               作业指导书
             </button>
             
             <div className="text-gray-800 font-bold mb-2">检验结果:</div>
             <div className="w-full py-3 bg-[#e8274d] text-black text-2xl font-bold tracking-widest flex items-center justify-center mb-10 shadow-sm">
               不合格
             </div>
             
             <div className="text-gray-800 font-bold mb-1">不合格代码:</div>
             <div className="w-full relative shadow-sm border border-gray-300 bg-white flex">
               <input type="text" className="w-full px-2 py-2.5 text-base focus:outline-none" />
               <button className="w-12 bg-gray-100 hover:bg-gray-200 border-l border-gray-300 flex items-center justify-center text-gray-400">
                  <Search size={22} className="transform -rotate-90" />
               </button>
             </div>
             <div className="flex-1"></div> {/* Spacer */}
             
             <button onClick={onBack} className="w-full py-4 mt-auto bg-[#5a86a0] hover:bg-[#4a758c] text-white font-bold text-2xl tracking-widest shadow-sm">
               确认
             </button>
          </div>

        </div>
        
        {/* Footer info block */}
        <div className="bg-white border-t border-gray-400 px-6 py-2 flex items-center justify-between text-gray-700 shrink-0 text-sm">
           <div className="flex items-center space-x-12">
             <span className="font-bold tracking-wider text-black">员工信息区</span>
             <span>当前操作人员: 杨灵利</span>
             <span>登录时间: 2026/4/14 10:39:58</span>
           </div>
           <div>版本号: V110</div>
        </div>
      </div>
    </div>
  );
};

const ScrapStorageView = ({ onBack }: { onBack: () => void }) => {
  const [activeTab, setActiveTab] = useState<'spool' | 'box'>('spool');

  return (
    <div className="flex flex-col h-full bg-[#f3f4f6] font-sans">
      <div className="flex-1 flex flex-col bg-white border m-2 shadow-sm relative overflow-hidden">
        
        {/* Top Header */}
        <div className="bg-[#1e3b5f] flex justify-between items-center px-4 py-2 border-b border-[#1e3b5f] shrink-0">
          <div className="flex items-center">
            <span className="font-bold text-white text-[15px]">废品入库</span>
          </div>
          <button onClick={onBack} className="bg-white/20 hover:bg-white/30 border border-white/40 px-3 py-1 rounded text-white text-sm focus:outline-none">后退</button>
        </div>

        {/* Form Controls */}
        <div className="p-4 bg-gray-100 border-b border-gray-300 flex flex-col space-y-4 shrink-0 shadow-inner">
          {/* Row 1 */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-gray-800 shrink-0 text-[15px]">托条码:</span>
              <input type="text" className="border border-gray-300 px-3 py-1.5 focus:outline-none focus:border-[#1976d2] bg-white w-48 shadow-sm" />
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" className="w-5 h-5 accent-[#1976d2] cursor-pointer" id="bad-product" />
              <label htmlFor="bad-product" className="font-bold text-gray-800 cursor-pointer text-[15px]">不良品入库</label>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-gray-800 shrink-0 text-[15px]">仓库:</span>
              <select className="border border-gray-300 px-3 py-1.5 focus:outline-none focus:border-[#1976d2] bg-white w-40 shadow-sm text-[15px]" defaultValue="不良品仓库">
                <option value="成品仓库">成品仓库</option>
                <option value="不良品仓库">不良品仓库</option>
                <option value="半成品仓库">半成品仓库</option>
                <option value="安徽原材料仓">安徽原材料仓</option>
                <option value="报废仓库">报废仓库</option>
                <option value="不核算成本仓">不核算成本仓</option>
              </select>
            </div>
            <div className="flex items-center space-x-2 ml-auto">
              <input type="checkbox" className="w-5 h-5 accent-[#1976d2] cursor-pointer" id="save-print" defaultChecked />
              <label htmlFor="save-print" className="font-bold text-gray-800 cursor-pointer text-[15px]">保存后就打印</label>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-gray-800 shrink-0 text-[15px]">打印明细模板:</span>
              <select className="border border-gray-300 px-3 py-1.5 focus:outline-none focus:border-[#1976d2] bg-white w-40 shadow-sm text-[15px]">
                <option>箱清单</option>
              </select>
            </div>
          </div>

          {/* Row 2 */}
          <div className="flex items-center space-x-8 text-[15px]">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-gray-800 shrink-0">日期:</span>
              <span className="font-bold text-black tracking-wide">2026-05-09</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-gray-800 shrink-0">客户:</span>
              <input type="text" className="border border-gray-300 px-3 py-1 focus:outline-none focus:border-[#1976d2] bg-white w-32 shadow-sm" />
            </div>
            <div className="flex items-center space-x-2 flex-1 max-w-xl">
              <span className="font-bold text-gray-800 shrink-0">备注:</span>
              <input type="text" className="border border-gray-300 px-3 py-1 focus:outline-none focus:border-[#1976d2] bg-white flex-1 shadow-sm" />
            </div>
          </div>
        </div>

        {/* Tab Header & Stats */}
        <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-300 shrink-0">
          <div className="flex space-x-2">
            <button 
              onClick={() => setActiveTab('spool')}
              className={`px-8 py-2 font-bold text-[15px] shadow-sm transition-colors border ${activeTab === 'spool' ? 'bg-[#31a0db] text-white border-[#2b8ebd]' : 'bg-[#a3a3a3] text-white border-[#909090] hover:bg-[#8f8f8f]'}`}
            >
              轴明细
            </button>
            <button 
              onClick={() => setActiveTab('box')}
              className={`px-8 py-2 font-bold text-[15px] shadow-sm transition-colors border ${activeTab === 'box' ? 'bg-[#31a0db] text-white border-[#2b8ebd]' : 'bg-[#a3a3a3] text-white border-[#909090] hover:bg-[#8f8f8f]'}`}
            >
              箱明细
            </button>
          </div>
          <div className="flex space-x-10 text-[16px] font-bold text-gray-800 pr-10">
            <div>轴数: <span className="text-black text-xl">0</span></div>
            <div>箱数: <span className="text-black text-xl">0</span></div>
          </div>
        </div>

        {/* Table Area */}
        <div className="flex-1 overflow-auto bg-white">
          <table className="w-full text-sm border-collapse min-w-max">
            <thead className="bg-[#f5f5f5] sticky top-0 z-10 shadow-[0_1px_0_#d1d5db]">
              <tr>
                <th className="px-4 py-2.5 border-b border-gray-400 border-r text-center font-bold text-gray-800 w-12">序号</th>
                <th className="px-4 py-2.5 border-b border-gray-400 border-r text-center font-bold text-gray-800 min-w-[120px]">托条码</th>
                <th className="px-4 py-2.5 border-b border-gray-400 border-r text-center font-bold text-gray-800 min-w-[120px]">箱条码</th>
                <th className="px-4 py-2.5 border-b border-gray-400 border-r text-center font-bold text-gray-800 min-w-[120px]">轴条码</th>
                <th className="px-4 py-2.5 border-b border-gray-400 border-r text-left font-bold text-gray-800 min-w-[120px]">物料编号</th>
                <th className="px-4 py-2.5 border-b border-gray-400 border-r text-left font-bold text-gray-800 min-w-[150px]">物料名称</th>
                <th className="px-4 py-2.5 border-b border-gray-400 border-r text-left font-bold text-gray-800 min-w-[120px]">客户物料编号</th>
                <th className="px-4 py-2.5 border-b border-gray-400 border-r text-left font-bold text-gray-800 min-w-[100px]">规格</th>
                <th className="px-4 py-2.5 border-b border-gray-400 text-right font-bold text-gray-800 min-w-[100px]">净重(KG)</th>
              </tr>
            </thead>
            <tbody>
              {/* Empty state for demonstration */}
              <tr>
                <td colSpan={9} className="text-center py-20 text-gray-400 bg-gray-50 border-b border-gray-200">
                  <div className="flex flex-col items-center justify-center">
                    <ClipboardList size={48} className="mb-4 text-gray-300" />
                    <span className="text-base tracking-wide font-medium">暂无明细数据，请扫描条码</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer Actions */}
        <div className="bg-gray-100 border-t border-gray-300 p-4 flex justify-center shrink-0">
          <button className="bg-[#0071ae] hover:bg-[#005a8f] text-white px-20 py-2.5 font-bold shadow-md tracking-widest text-[16px] transition-colors focus:outline-none border border-[#005a8f] rounded">
            保存
          </button>
        </div>
      </div>
    </div>
  );
};

const ScrapHandoverView = ({ onBack }: { onBack: () => void }) => {
  const [scannedItems, setScannedItems] = useState([
    { id: 'FP2605140001', name: '拉丝废铜', spec: 'Φ3.00', weight: '24.5', time: '10:45:12' },
    { id: 'FP2605140002', name: '绝缘废皮', spec: '-', weight: '2.1', time: '10:46:08' }
  ]);

  return (
    <div className="flex flex-col h-full bg-[#f3f4f6] font-sans">
      <div className="flex-1 flex flex-col bg-white border m-2 shadow-sm relative no-scrollbar overflow-hidden">
        
        {/* Top Header */}
        <div className="bg-[#1e3b5f] flex justify-between items-center px-4 py-2 border-b border-[#1e3b5f] shrink-0">
          <div className="flex items-center">
            <span className="font-bold text-white text-base tracking-widest">交废入库</span>
          </div>
          <button onClick={onBack} className="bg-white/20 hover:bg-white/30 border border-white/40 px-3 py-1 rounded text-white text-sm focus:outline-none">后退</button>
        </div>

        {/* Info Banner */}
        <div className="bg-[#eff6ff] text-[#1976d2] px-6 py-2.5 flex items-start text-sm border-b border-[#bfdbfe] shrink-0">
          <Info size={18} className="mr-2 shrink-0" />
          <span>根据调拨类型自动匹配收发仓库，只需扫描物料即可。</span>
        </div>

        {/* Form Fields */}
        <div className="px-6 py-6 border-b border-gray-200 shrink-0 bg-gray-50 flex flex-col">
          <div className="grid grid-cols-2 gap-x-12 gap-y-6 max-w-4xl">
            <div className="flex items-center space-x-4">
              <span className="w-24 text-right text-gray-700 font-bold text-[15px]">入库类型:</span>
              <input type="text" value="废品入库" disabled className="flex-1 border border-gray-300 bg-gray-200 rounded px-3 py-2 text-gray-800" />
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="w-24 text-right text-gray-700 font-bold text-[15px]">调出仓库:</span>
              <input type="text" value="拉丝车间工序仓" disabled className="flex-1 border border-gray-300 bg-gray-200 rounded px-3 py-2 text-gray-800" />
            </div>

            <div className="flex items-center space-x-4">
              <span className="w-24 text-right text-gray-700 font-bold text-[15px]">调入仓库:</span>
              <select className="flex-1 border border-gray-300 rounded px-3 py-2 text-gray-800 bg-white focus:outline-none focus:border-[#1976d2]">
                <option value="scrap">废品仓</option>
                <option value="other">工序委外仓</option>
                <option value="other2">总成品仓</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="w-24 text-right text-gray-700 font-bold text-[15px]">待交废条码:</span>
              <div className="flex-1 relative">
                <input 
                  type="text" 
                  placeholder="请扫描或输入待交废的材料条码" 
                  className="w-full border border-[#1976d2] rounded px-3 py-2 text-gray-800 bg-white focus:outline-none focus:ring-1 focus:ring-[#1976d2]" 
                />
                <ScanLine size={18} className="absolute right-3 top-2.5 text-[#1976d2]" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Scanned Details Area */}
        <div className="flex-1 flex flex-col min-h-0 bg-white">
          <div className="px-6 py-2 bg-white border-b border-gray-200 flex items-center justify-between">
            <span className="font-bold text-gray-800 text-[15px]">已扫描明细 (共 {scannedItems.length} 条)</span>
          </div>
          
          <div className="flex-1 overflow-auto">
            <table className="w-full text-sm border-collapse">
              <thead className="bg-[#f5f5f5] sticky top-0 z-10 shadow-[0_1px_0_#d1d5db]">
                <tr>
                  <th className="px-4 py-2 border-b border-gray-400 border-r text-center font-bold text-gray-800 w-16">序号</th>
                  <th className="px-4 py-2 border-b border-gray-400 border-r text-center font-bold text-gray-800">条形码</th>
                  <th className="px-4 py-2 border-b border-gray-400 border-r text-left font-bold text-gray-800">物料名称</th>
                  <th className="px-4 py-2 border-b border-gray-400 border-r text-left font-bold text-gray-800">规格</th>
                  <th className="px-4 py-2 border-b border-gray-400 border-r text-right font-bold text-gray-800">交废重量 (KG)</th>
                  <th className="px-4 py-2 border-b border-gray-400 text-center font-bold text-gray-800 w-32">扫描时间</th>
                </tr>
              </thead>
              <tbody>
                {scannedItems.length > 0 ? (
                  scannedItems.map((item, idx) => (
                    <tr key={item.id} className="border-b border-gray-200 hover:bg-blue-50">
                      <td className="px-4 py-2.5 text-center text-gray-600 border-r border-gray-200">{idx + 1}</td>
                      <td className="px-4 py-2.5 text-center font-mono text-[#1976d2] font-semibold border-r border-gray-200">{item.id}</td>
                      <td className="px-4 py-2.5 text-gray-800 font-medium border-r border-gray-200">{item.name}</td>
                      <td className="px-4 py-2.5 text-gray-600 border-r border-gray-200">{item.spec}</td>
                      <td className="px-4 py-2.5 text-right font-bold text-green-700 border-r border-gray-200">{item.weight}</td>
                      <td className="px-4 py-2.5 text-center text-gray-500">{item.time}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-20 text-gray-400 bg-gray-50/50">
                      <div className="flex flex-col items-center justify-center">
                        <ScanLine size={48} className="mb-4 text-gray-300" />
                        <span className="text-base tracking-wide font-medium">暂无扫描数据</span>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-gray-100 border-t border-gray-300 py-3 flex justify-center shrink-0">
           <button className="bg-[#1976d2] hover:bg-[#1565c0] text-white px-32 py-3 rounded text-[16px] shadow tracking-widest font-bold">
             确认交废入库
           </button>
        </div>

      </div>
    </div>
  );
};

const UnloadView = ({ task, onBack }: { task: Task, onBack: () => void }) => {
  return (
    <div className="flex flex-col h-full bg-[#f3f4f6] font-sans">
      <div className="flex-1 flex flex-col bg-white border m-2 shadow-sm relative no-scrollbar overflow-y-auto">
        {/* Top Header */}
        <div className="bg-[#1e3b5f] flex justify-between items-center px-4 py-2 border-b border-[#1e3b5f] shrink-0">
          <div className="flex items-center">
            <span className="font-bold text-white text-base tracking-widest">上料解除</span>
          </div>
          <button onClick={onBack} className="bg-white/20 hover:bg-white/30 border border-white/40 px-3 py-1 rounded text-white text-sm">后退</button>
        </div>

        {/* Machine info */}
        <div className="flex justify-between items-center px-4 py-2 border-b border-gray-300 font-bold text-gray-800 text-sm">
          <span>机台：1#单绞机</span>
          <span>班次：2024032901</span>
          <span className="w-1/3"></span>
        </div>

        <div className="bg-[#1976d2] px-4 py-1.5 text-white text-sm font-bold tracking-widest border-b border-[#1976d2]">
          上料列表
        </div>

        {/* Table Area */}
        <div className="flex-1 overflow-auto border-b border-gray-300">
          <table className="w-full text-xs text-center border-collapse">
            <thead className="bg-[#f0f0f0] border-b border-gray-400">
              <tr>
                <th className="px-2 py-3 border-r border-gray-300 w-12 font-bold text-gray-700"></th>
                <th className="px-2 py-3 border-r border-gray-300 font-bold text-gray-700">批号/SN</th>
                <th className="px-2 py-3 border-r border-gray-300 font-bold text-gray-700 leading-tight">型号<br/>规格</th>
                <th className="px-2 py-3 border-r border-gray-300 font-bold text-gray-700 leading-tight">物料名称<br/>颜色</th>
                <th className="px-2 py-3 border-r border-gray-300 font-bold text-gray-700 leading-tight">上料用量<br/>单位</th>
                <th className="px-2 py-3 border-r border-gray-300 font-bold text-gray-700">实际用量</th>
                <th className="px-2 py-3 border-r border-gray-300 font-bold text-gray-700">计算结余</th>
                <th className="px-2 py-3 border-r border-gray-300 font-bold text-gray-700">实际结余</th>
                <th className="px-2 py-3 font-bold text-gray-700">备注</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-2 py-4 border-r border-gray-300">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-400 accent-blue-600" />
                </td>
                <td className="px-2 py-4 border-r border-gray-300 text-gray-800">JS0022403140003</td>
                <td className="px-2 py-4 border-r border-gray-300 text-gray-800">0.5</td>
                <td className="px-2 py-4 border-r border-gray-300 text-gray-800 text-left leading-tight">RVVP绝缘线芯-麓谷<br/>棕色</td>
                <td className="px-2 py-4 border-r border-gray-300 text-gray-800 leading-tight">0.5719<br/>千米</td>
                <td className="px-2 py-4 border-r border-gray-300 text-gray-800">0</td>
                <td className="px-2 py-4 border-r border-gray-300 text-gray-800">0.5719</td>
                <td className="px-2 py-4 border-r border-gray-300 p-0 align-middle">
                  <input type="text" defaultValue="0.5719" className="w-16 border border-gray-300 px-1 py-1 focus:outline-none focus:border-blue-400 text-center mx-auto" />
                </td>
                <td className="px-2 py-4 text-gray-800"></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Bottom Form */}
        <div className="p-3 border-t border-gray-300 flex justify-center bg-white shrink-0">
          <button className="bg-[#1976d2] hover:bg-[#1565c0] text-white px-12 py-2 text-base font-bold tracking-[0.2em] transition-colors rounded" onClick={() => {
            alert('上料解除成功！');
            onBack();
          }}>
            提交
          </button>
        </div>
      </div>
    </div>
  );
};

const TailWeighView = ({ task, onBack }: { task: Task, onBack: () => void }) => {
  const [weighedValues, setWeighedValues] = useState<Record<string, string>>({});

  return (
    <div className="flex flex-col h-full bg-[#f3f4f6] font-sans">
      <div className="flex-1 flex flex-col bg-white border m-2 shadow-sm relative no-scrollbar overflow-y-auto">
        {/* Top Header */}
        <div className="bg-[#1e3b5f] flex justify-between items-center px-4 py-2 border-b border-[#1e3b5f] shrink-0">
          <div className="flex items-center">
            <span className="font-bold text-white text-base tracking-widest">尾料称重操作</span>
          </div>
          <button onClick={onBack} className="bg-white/20 hover:bg-white/30 border border-white/40 px-3 py-1 rounded text-white text-sm">后退</button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-4 bg-blue-50 p-4 border border-blue-100 rounded text-[#1976d2] text-[14px] font-medium flex items-center">
            <Info size={20} className="mr-2 shrink-0" />
            <span>系统实现对下料的电磁线材料进行尾料称重操作，请录入称重重量。</span>
          </div>

          <table className="w-full text-sm border-collapse mt-4">
            <thead className="bg-[#f5f5f5] shadow-[0_1px_0_#d1d5db]">
              <tr>
                <th className="px-4 py-3 border-b border-gray-400 border-r text-center font-bold text-gray-800 w-16">序号</th>
                <th className="px-4 py-3 border-b border-gray-400 border-r text-left font-bold text-gray-800">物料编码</th>
                <th className="px-4 py-3 border-b border-gray-400 border-r text-left font-bold text-gray-800">物料名称</th>
                <th className="px-4 py-3 border-b border-gray-400 border-r text-left font-bold text-gray-800">规格</th>
                <th className="px-4 py-3 border-b border-gray-400 border-r text-right font-bold text-gray-800">称重前理论重量 (KG)</th>
                <th className="px-4 py-3 border-b border-gray-400 text-center font-bold text-gray-800 w-48">实际称重 (KG)</th>
              </tr>
            </thead>
            <tbody>
              {task.bom?.map((b, idx) => (
                <tr key={b.id} className="border-b border-gray-200 hover:bg-blue-50">
                  <td className="px-4 py-3 text-center text-gray-600 border-r border-gray-200">{idx + 1}</td>
                  <td className="px-4 py-3 font-mono text-[#1976d2] font-semibold border-r border-gray-200">{b.materialCode}</td>
                  <td className="px-4 py-3 text-gray-800 font-medium border-r border-gray-200">{b.materialName}</td>
                  <td className="px-4 py-3 text-gray-600 border-r border-gray-200">{b.spec}</td>
                  <td className="px-4 py-3 text-right font-bold text-gray-700 border-r border-gray-200">
                    {(b.requiredQty * 0.1).toFixed(2)}
                  </td>
                  <td className="px-4 py-2 text-center bg-white">
                    <input 
                      type="number" 
                      value={weighedValues[b.id] || ''} 
                      onChange={e => setWeighedValues({ ...weighedValues, [b.id]: e.target.value })}
                      className="w-full border border-[#1976d2] rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#1976d2] text-center font-bold text-gray-800"
                      placeholder="输入重量"
                    />
                  </td>
                </tr>
              )) || <tr><td colSpan={6} className="text-center py-10 text-gray-500">无物料明细数据</td></tr>}
            </tbody>
          </table>
        </div>

        <div className="mt-auto p-4 bg-gray-50 border-t border-gray-200 flex justify-center">
          <button 
            className="bg-[#1976d2] hover:bg-[#1565c0] text-white px-24 py-3 rounded text-[16px] shadow-sm tracking-widest font-bold"
            onClick={() => {
              alert('尾料称重保存成功！');
              onBack();
            }}
          >
            保存称重结果
          </button>
        </div>

      </div>
    </div>
  );
};

const WeighingStandaloneView = ({ task, onBack }: { task: Task, onBack: () => void }) => {
  const [barcode, setBarcode] = useState<string>('');
  const [scannedItem, setScannedItem] = useState<{
    barcode: string;
    name: string;
    spoolWeight: string;
    theoreticalWeight: string;
    isPreSet?: boolean;
  } | null>(null);

  // Live scale variables
  const [scaleWeight, setScaleWeight] = useState<string>('0.00');
  const [isStable, setIsStable] = useState<boolean>(true);
  const [isWeighing, setIsWeighing] = useState<boolean>(false);
  const [records, setRecords] = useState<Array<{
    id: string;
    time: string;
    barcode: string;
    name: string;
    grossWeight: string;
    tareWeight: string;
    netWeight: string;
    status: '合格' | '超差' | '正常';
  }>>([]);

  // Mock list of barcodes available for quick simulation (or scanner gun simulation)
  const simulationBarcodes = useMemo(() => [
    { barcode: '2503072902001016', name: '1.25mm 聚酯亚胺漆包圆铜线 [PC200卷盘]', spoolWeight: '8.50', theoreticalWeight: '112.50' },
    { barcode: '2503072902001017', name: '1.25mm 聚酯亚胺漆包圆铜线 [PC200卷盘]', spoolWeight: '8.50', theoreticalWeight: '112.50' },
    { barcode: '2503072902113224', name: 'Φ1.00mm 裸铜圆线原料线圈芯 [工字盘]', spoolWeight: '12.00', theoreticalWeight: '162.00' },
    { barcode: '2503072902998412', name: 'PVF-1 聚乙烯醇缩醛漆辅料桶 [钢装罐]', spoolWeight: '15.30', theoreticalWeight: '65.30' }
  ], []);

  // Handler for barcode inputs (manual or simulated scan)
  const handleScan = (code: string) => {
    setBarcode(code);
    const found = simulationBarcodes.find(item => item.barcode === code) || {
      barcode: code,
      name: '自定义外部物料/盘具 [临时条码]',
      spoolWeight: '6.50',
      theoreticalWeight: '85.50'
    };
    
    setScannedItem(found);
    setIsWeighing(true);
    setIsStable(false);
    
    // Scale stabilization simulation
    let current = 0.00;
    const target = parseFloat(found.theoreticalWeight) - 0.15 + (Math.random() * 0.3); // slight random tolerance
    const increment = target / 15;
    
    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        clearInterval(interval);
        setScaleWeight(target.toFixed(2));
        setIsStable(true);
        setIsWeighing(false);
      } else {
        // Add random jitter during counting
        const jitter = (Math.random() - 0.5) * 1.5;
        setScaleWeight((current + jitter).toFixed(2));
      }
    }, 50);
  };

  // Confirm and save weight standard flow
  const handleConfirmWeighing = () => {
    if (!scannedItem) {
      alert('请先录入或扫描有效的物料条码/产品批次号！');
      return;
    }
    
    if (!isStable) {
      alert('电子天平尚未稳定，请稍候...！');
      return;
    }

    const gross = parseFloat(scaleWeight);
    const tare = parseFloat(scannedItem.spoolWeight);
    const net = gross - tare;
    
    // Check if within tolerance
    const theoretical = parseFloat(scannedItem.theoreticalWeight);
    const dev = Math.abs(gross - theoretical) / theoretical;
    const status = dev < 0.05 ? '合格' : '超差';

    const newRecord = {
      id: `WREC-${Date.now().toString().slice(-6)}`,
      time: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
      barcode: scannedItem.barcode,
      name: scannedItem.name,
      grossWeight: scaleWeight,
      tareWeight: scannedItem.spoolWeight,
      netWeight: net.toFixed(2),
      status: status as '合格' | '超差' | '正常'
    };

    setRecords(prev => [newRecord, ...prev]);
    alert(`【称重保存成功】\n条码: ${newRecord.barcode}\n毛重(G.W): ${newRecord.grossWeight} Kg\n扣盘重(Tare): ${newRecord.tareWeight} Kg\n物理净重(N.W): ${newRecord.netWeight} Kg\n状态: ${newRecord.status}`);
  };

  // Reset/Clear weighing state
  const handleReset = () => {
    setBarcode('');
    setScannedItem(null);
    setScaleWeight('0.00');
    setIsStable(true);
  };

  return (
    <div className="flex flex-col h-full bg-[#e8e9eb] font-sans text-gray-800 p-4">
      {/* Outer framing wrapper representing the physical frame from the image */}
      <div className="flex-1 bg-white border border-gray-400 p-6 flex flex-col relative shadow-md rounded">
        
        {/* Toly Logo Header & Go Back */}
        <div className="flex justify-between items-center pb-4 border-b border-gray-200 shrink-0">
          <div className="flex items-center space-x-2">
            {/* Elegant SVG replicating TOLY logo */}
            <div className="flex items-center space-x-1.5">
              <svg width="34" height="34" viewBox="0 0 100 100" className="drop-shadow-sm shrink-0">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#e13333" strokeWidth="5" />
                <path d="M 15,50 Q 50,15 85,50" fill="none" stroke="#104e9c" strokeWidth="6" />
                <path d="M 15,50 Q 50,85 85,50" fill="none" stroke="#104e9c" strokeWidth="6" />
                <text x="50" y="58" fontFamily="Impact, sans-serif" fontSize="24" fill="#104e9c" textAnchor="middle" fontWeight="bold">TOLY</text>
              </svg>
              <div className="flex flex-col select-none">
                <span className="font-bold tracking-wider text-[21px] text-[#114b9a] font-sans leading-none">统力电工</span>
                <span className="text-[10px] font-semibold text-gray-500 tracking-widest font-mono leading-tight">TOLY ELECTRIC</span>
              </div>
            </div>
          </div>
          
          <button 
            onClick={onBack} 
            className="bg-gray-100 border border-gray-400 text-black px-6 py-1.5 font-bold hover:bg-gray-200 active:bg-gray-300 shadow-sm text-sm"
          >
            后退
          </button>
        </div>

        {/* Master Weighing Console Grid */}
        <div className="flex-1 grid grid-cols-1 xl:grid-cols-12 gap-6 mt-6 overflow-auto">
          
          {/* Left / Center console: The Core Hardware Panel (representing image 7-1) */}
          <div className="xl:col-span-8 flex flex-col space-y-6">
            <div className="bg-[#f0f2f5] border border-gray-300 rounded p-6 shadow-inner flex-1 flex flex-col justify-between">
              
              <div>
                {/* Product Barcode Entry Label */}
                <h2 className="text-[30px] font-bold text-gray-800 tracking-wide mb-4">
                  物料条码录入
                </h2>

                {/* Form fields: Input box + Spool & Theoretical Weight Indicators */}
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="w-full md:w-80">
                    <input 
                      type="text" 
                      value={barcode}
                      onChange={(e) => setBarcode(e.target.value)}
                      placeholder="扫描或录入条码..."
                      className="w-full bg-white border border-gray-400 rounded px-4 py-3 text-lg font-bold font-mono text-gray-900 tracking-wider shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && barcode.trim()) {
                          handleScan(barcode.trim());
                        }
                      }}
                    />
                  </div>

                  {/* Indicators shown in 7-1 */}
                  <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-xl font-bold text-gray-800">
                    <div className="flex items-center space-x-2">
                      <span>盘重：</span>
                      <span className="text-gray-900 font-mono text-2xl">
                        {scannedItem ? scannedItem.spoolWeight : '—'}
                      </span>
                      <span className="text-gray-500 text-lg">Kg</span>
                    </div>

                    <div className="flex items-center space-x-2 border-l border-gray-400 pl-6">
                      <span>理论毛重：</span>
                      <span className="text-gray-900 font-mono text-2xl">
                        {scannedItem ? scannedItem.theoreticalWeight : '—'}
                      </span>
                      <span className="text-gray-500 text-lg">Kg</span>
                    </div>
                  </div>
                </div>

                {/* Separator / Subtitle bar */}
                <div className="border-b border-gray-300 mt-4 pb-2 text-[13px] text-gray-500 font-medium">
                  {scannedItem ? (
                    <span className="text-[#1565c0] font-bold">
                      当前识别物料: {scannedItem.name}
                    </span>
                  ) : (
                    <span>— 请置入条码进行重准归集校验</span>
                  )}
                </div>
              </div>

              {/* Gross Weight Section & LED Box */}
              <div className="my-8">
                <div className="flex items-baseline space-x-3 text-[26px] font-extrabold text-gray-800 mb-2">
                  <span>毛重/G. W</span>
                  {isWeighing && (
                    <span className="text-blue-600 animate-pulse text-[13px] font-bold bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      电子秤数值稳定中...
                    </span>
                  )}
                  {!isWeighing && scannedItem && (
                    <span className="text-emerald-700 text-[13px] font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center space-x-1">
                      <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
                      <span>已稳定 (STABLE)</span>
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-5">
                  {/* Huge Black LED scale display box */}
                  <div className="bg-black border-4 border-gray-600 rounded px-6 py-6 min-w-[320px] max-w-[420px] flex items-center justify-end shadow-2xl relative overflow-hidden">
                    {/* Subtle LED scanlines pattern */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-black/10 pointer-events-none"></div>
                    
                    <span className={`text-[62px] font-bold font-mono tracking-wider ${isWeighing ? 'text-amber-400' : 'text-emerald-500'} select-none drop-shadow-[0_0_10px_rgba(16,185,129,0.3)]`}>
                      {scaleWeight}
                    </span>
                  </div>

                  <span className="text-gray-900 font-extrabold text-[56px] tracking-wide select-none">
                    Kg
                  </span>
                </div>
              </div>

              {/* Huge Blue Action Confirmation Button */}
              <div className="flex justify-center pt-4 border-t border-gray-300">
                <button 
                  onClick={handleConfirmWeighing}
                  className="w-full bg-[#3b5998] hover:bg-[#2e4577] active:bg-[#1f3054] text-white py-4 px-12 rounded font-extrabold text-2xl tracking-[0.3em] shadow-md transition-colors border border-gray-500"
                >
                  确定
                </button>
              </div>

            </div>

            {/* Bottom Help Note and Code ID */}
            <div className="flex justify-between items-center text-xs text-gray-500 select-none px-2 py-1 bg-gray-100 rounded border">
              <span>说明：立盘称重只能用于工业成品</span>
              <span className="font-bold tracking-widest text-[#1565c0] bg-blue-50 px-2 py-0.5 rounded border">7-1</span>
            </div>
          </div>

          {/* Right helper console: Presets Bar & Weigh Records Diary */}
          <div className="xl:col-span-4 flex flex-col space-y-6">
            
            {/* Simulated scale barcode scan triggers */}
            <div className="bg-white border border-gray-350 p-4 rounded shadow-sm">
              <h3 className="text-sm font-extrabold text-gray-700 bg-gray-100 px-3 py-1.5 rounded mb-3 border-l-4 border-blue-600 flex items-center justify-between">
                <span>条码枪模拟及电子秤仿真</span>
                <span className="text-[11px] font-normal text-gray-500">点选即开称</span>
              </h3>
              
              <div className="space-y-2 mt-2">
                <p className="text-xs text-gray-500">请点击下方列出的任意物料，以模拟扫描物理标签条码：</p>
                {simulationBarcodes.map((item) => (
                  <button
                    key={item.barcode}
                    onClick={() => handleScan(item.barcode)}
                    className={`w-full text-left p-2.5 rounded border transition-all text-xs ${
                      barcode === item.barcode 
                        ? 'bg-blue-50 border-blue-400 text-blue-900 font-bold shadow-sm' 
                        : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-[#1565c0] font-bold">{item.barcode}</span>
                      <span className="text-[10px] bg-gray-200 text-gray-600 px-1 py-0.2 rounded font-mono">
                        盘:{item.spoolWeight}k
                      </span>
                    </div>
                    <div className="text-gray-500 mt-1 truncate font-medium">{item.name}</div>
                  </button>
                ))}
              </div>

              {/* Weight manual jitter trigger */}
              {scannedItem && (
                <div className="mt-4 pt-3 border-t border-gray-200">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-gray-600">手动微调传感器量程值:</span>
                    <button 
                      onClick={() => {
                        const baseVal = parseFloat(scannedItem.theoreticalWeight);
                        const altered = (baseVal + (Math.random() - 0.5) * 5).toFixed(2);
                        setScaleWeight(altered);
                        setIsStable(true);
                      }}
                      className="text-[10px] bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 px-2 py-0.5 rounded font-bold transition-all"
                    >
                      抖动干扰
                    </button>
                  </div>
                  <input 
                    type="range" 
                    min={parseFloat(scannedItem.spoolWeight) + 5} 
                    max={parseFloat(scannedItem.theoreticalWeight) + 30} 
                    step="0.05"
                    value={parseFloat(scaleWeight) || 0}
                    onChange={(e) => {
                      setScaleWeight(parseFloat(e.target.value).toFixed(2));
                      setIsStable(true);
                    }}
                    className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-ew-resize accent-blue-600"
                  />
                  <div className="flex justify-between text-[11px] text-gray-400 font-mono mt-1">
                    <span>{parseFloat(scannedItem.spoolWeight) + 5} Kg</span>
                    <span className="text-blue-600 font-bold">设定: {scaleWeight} Kg</span>
                    <span>{parseFloat(scannedItem.theoreticalWeight) + 30} Kg</span>
                  </div>
                </div>
              )}

              <div className="mt-3 flex space-x-2">
                <button
                  onClick={handleReset}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-1.5 rounded font-semibold text-xs transition-colors"
                >
                  清除当前称重
                </button>
              </div>
            </div>

            {/* Weighing History Records widget */}
            <div className="bg-white border border-gray-350 p-4 rounded shadow-sm flex-1 flex flex-col min-h-[180px]">
              <h3 className="text-sm font-extrabold text-gray-700 bg-gray-100 px-3 py-1.5 rounded mb-2 border-l-4 border-emerald-600 flex justify-between items-center select-none">
                <span>现场称重归集历史明细 ({records.length})</span>
                {records.length > 0 && (
                  <button 
                    onClick={() => setRecords([])} 
                    className="text-xs text-red-600 hover:text-red-800 font-bold"
                  >
                    清空
                  </button>
                )}
              </h3>

              <div className="flex-1 overflow-auto max-h-[220px] text-xs">
                {records.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-gray-400 py-8 text-center select-none">
                    <ClipboardList className="opacity-30 mb-1" size={24} />
                    <span>暂无称重流水记录</span>
                    <span className="text-[11px] text-gray-350 mt-1">点[确定]保存的记录将列示于此</span>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {records.map((rec) => (
                      <div key={rec.id} className="p-2 bg-gray-50 border border-gray-200 rounded text-[11px] hover:shadow-sm transition-all">
                        <div className="flex justify-between items-center font-bold">
                          <span className="text-gray-500 font-mono">{rec.id}</span>
                          <span className={`${rec.status === '合格' ? 'text-emerald-700 bg-emerald-50 px-1 rounded' : 'text-amber-700 bg-amber-50 px-1 rounded'}`}>
                            {rec.status}
                          </span>
                        </div>
                        <div className="text-gray-700 font-mono mt-1 truncate">条码: {rec.barcode}</div>
                        <div className="text-gray-400 truncate">{rec.name}</div>
                        <div className="mt-1 flex justify-between bg-white px-2 py-0.5 rounded text-[11px] font-mono border text-gray-600 scale-95 origin-left">
                          <span>毛:<strong>{rec.grossWeight}</strong>kg</span>
                          <span>盘:<strong>{rec.tareWeight}</strong>kg</span>
                          <span className="text-blue-600">净:<strong>{rec.netWeight}</strong>kg</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

const ExceptionLockView = ({ task, onBack }: { task: Task, onBack: () => void }) => {
  const [lockedItems, setLockedItems] = useState([
    { id: 1, barcode: '260400049-001', time: '2026-05-18 14:20:00', weight: '20.5', reason: '首检未通过锁定', status: '已锁定' },
    { id: 2, barcode: '260400049-002', time: '2026-05-18 16:45:00', weight: '19.8', reason: '检验不合格锁定', status: '已锁定' }
  ]);
  const [showPrompt, setShowPrompt] = useState<string | null>(null);

  const handleReInspect = (barcode: string) => {
    setShowPrompt(barcode);
  };

  const confirmReInspect = () => {
    setLockedItems(items => items.map(item => item.barcode === showPrompt ? { ...item, status: '已送检' } : item));
    setShowPrompt(null);
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="bg-gray-100 p-4 border-b border-gray-200 flex items-center justify-between shadow-sm flex-shrink-0">
        <div className="flex items-center space-x-4">
          <button onClick={onBack} className="text-gray-500 hover:text-gray-800 transition-colors">
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-xl font-bold text-[#1e3b5f] tracking-wide border-l-4 border-[#1976d2] pl-3">汇报异常锁定查询</h2>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto p-6 bg-gray-50">
        <div className="bg-white rounded shadow border border-gray-200 overflow-hidden">
          <table className="w-full text-center border-collapse">
            <thead>
              <tr className="bg-[#1e3b5f] text-white">
                <th className="py-3 px-4 font-bold border-r border-[#152e4d]">序号</th>
                <th className="py-3 px-4 font-bold border-r border-[#152e4d]">下盘条码</th>
                <th className="py-3 px-4 font-bold border-r border-[#152e4d]">下盘时间</th>
                <th className="py-3 px-4 font-bold border-r border-[#152e4d]">重量 (kg)</th>
                <th className="py-3 px-4 font-bold border-r border-[#152e4d]">锁定原因</th>
                <th className="py-3 px-4 font-bold border-r border-[#152e4d]">状态</th>
                <th className="py-3 px-4 font-bold">操作</th>
              </tr>
            </thead>
            <tbody>
              {lockedItems.map((item, index) => (
                <tr key={item.id} className={`border-b border-gray-200 ${index % 2 === 0 ? 'bg-white' : 'bg-blue-50/40'} hover:bg-blue-100/50 transition-colors`}>
                  <td className="py-2 px-4 border-r border-gray-200 text-[#1e3b5f] font-medium">{index + 1}</td>
                  <td className="py-2 px-4 border-r border-gray-200 text-[#1976d2] font-semibold">{item.barcode}</td>
                  <td className="py-2 px-4 border-r border-gray-200 text-gray-600">{item.time}</td>
                  <td className="py-2 px-4 border-r border-gray-200 font-bold">{item.weight}</td>
                  <td className="py-2 px-4 border-r border-gray-200 text-red-600">{item.reason}</td>
                  <td className="py-2 px-4 border-r border-gray-200">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${item.status === '已送检' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-2 px-4">
                    <button 
                      onClick={() => handleReInspect(item.barcode)}
                      disabled={item.status === '已送检'}
                      className="text-white bg-[#1976d2] hover:bg-[#1565c0] px-4 py-1.5 rounded shadow-sm text-sm font-bold tracking-wider transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      再次送检
                    </button>
                  </td>
                </tr>
              ))}
              {lockedItems.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-8 text-gray-500 font-medium tracking-wider">当前派工单暂无异常锁定记录</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showPrompt && (
        <div className="fixed inset-0 bg-transparent z-50 flex items-center justify-center font-sans drop-shadow-2xl">
          <div className="bg-white border border-gray-400 w-[450px] shadow-[0_0_15px_rgba(0,0,0,0.2)] flex flex-col rounded-t-[3px]">
            <div className="bg-[#1e3b5f] border-b border-[#1e3b5f] text-white px-2 py-1.5 text-md flex items-center tracking-wide font-medium">
              <span>提示</span>
            </div>
            <div className="p-6 bg-white flex flex-row items-start space-x-4 flex-1 h-[140px]">
              <div className="rounded-full bg-[#3587e8] text-white w-[36px] h-[36px] flex items-center justify-center font-serif text-2xl font-bold shrink-0 shadow-sm mt-1">i</div>
              <div className="text-[19px] text-[#111] leading-snug pt-1">
                是否重新推送当前下盘条码为<br/>{showPrompt}的检验任务？
              </div>
            </div>
            <div className="bg-[#f0f0f0] border-t border-gray-300 px-4 py-3 flex justify-end space-x-3 rounded-b-[3px]">
              <button 
                onClick={confirmReInspect}
                className="bg-[#1976d2] hover:bg-[#1565c0] text-white border border-[#1976d2] px-6 py-1.5 text-[15px] rounded shadow-sm focus:outline-none transition-colors"
                style={{ textShadow: '0 -1px 0 rgba(0,0,0,0.2)' }}
              >
                确定
              </button>
              <button 
                onClick={() => setShowPrompt(null)}
                className="bg-[#f5f5f5] hover:bg-[#e8e8e8] text-gray-800 border border-gray-400 px-6 py-1.5 text-[15px] rounded focus:outline-none transition-colors"
              >
                取消
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const SelfInspectionView = ({ onBack }: { onBack: () => void }) => {
  const [items, setItems] = useState([
    { id: 1, name: '线速度', standard: '>', value: '200', isOk: true },
    { id: 2, name: '不圆度', standard: '>', value: '0.279', isOk: true },
    { id: 3, name: 'A外观', standard: '>', value: 'ok', isOk: true },
    { id: 4, name: 'A直径1', standard: '>', value: '0.278', isOk: true },
    { id: 5, name: 'A直径2', standard: '>', value: '0.279', isOk: true },
    { id: 6, name: 'A直径3', standard: '>', value: '0.278', isOk: true },
    { id: 7, name: 'B外观', standard: '>', value: 'ok', isOk: true },
    { id: 8, name: 'B直径1', standard: '>', value: '0.276', isOk: true },
    { id: 9, name: 'B直径2', standard: '>', value: '0.277', isOk: true },
    { id: 10, name: 'B直径3', standard: '>', value: '0.278', isOk: true },
  ]);

  const [overallOk, setOverallOk] = useState(true);
  const [autoInspect, setAutoInspect] = useState(false);

  const handleValueChange = (id: number, value: string) => {
    setItems(items.map(item => item.id === id ? { ...item, value } : item));
  };

  const handleToggleChange = (id: number, isOk: boolean) => {
    setItems(items.map(item => item.id === id ? { ...item, isOk } : item));
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="bg-gray-100 p-4 border-b border-gray-200 flex items-center justify-between shadow-sm flex-shrink-0">
        <div className="flex items-center space-x-4">
          <button onClick={onBack} className="text-gray-500 hover:text-gray-800 transition-colors">
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-xl font-bold text-[#1e3b5f] tracking-wide border-l-4 border-[#1976d2] pl-3">调试检验</h2>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6 bg-gray-50">
        <div className="bg-white rounded shadow border border-gray-200 overflow-hidden">
          <table className="w-full text-center border-collapse">
            <thead>
              <tr className="bg-[#1e3b5f] text-white">
                <th className="py-3 px-4 font-bold w-20 border-r border-[#152e4d]">项目</th>
                <th className="py-3 px-4 font-bold border-r border-[#152e4d]">检验项目</th>
                <th className="py-3 px-4 font-bold w-32 border-r border-[#152e4d]">标准参数</th>
                <th className="py-3 px-4 font-bold w-1/3 border-r border-[#152e4d]">检验数据</th>
                <th className="py-3 px-4 font-bold w-32 border-l border-[#152e4d]">合格判定</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={item.id} className={`border-b border-gray-200 ${index % 2 === 0 ? 'bg-white' : 'bg-blue-50/40'} hover:bg-blue-100/50 transition-colors`}>
                  <td className="py-2 px-4 border-r border-gray-200 text-[#1e3b5f] font-medium">{item.id}</td>
                  <td className="py-2 px-4 border-r border-gray-200 text-[#1e3b5f] font-bold">{item.name}</td>
                  <td className="py-2 px-4 border-r border-gray-200 text-gray-600">{item.standard}</td>
                  <td className="py-2 px-4 border-r border-gray-200">
                    <input 
                      type="text" 
                      value={item.value} 
                      onChange={(e) => handleValueChange(item.id, e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-1.5 focus:outline-none focus:border-[#1976d2] focus:ring-1 focus:ring-[#1976d2] font-mono text-[#1e3b5f]"
                    />
                  </td>
                  <td className="py-2 px-4">
                    <button 
                      onClick={() => handleToggleChange(item.id, !item.isOk)}
                      className={`w-14 h-7 rounded-full relative transition-colors duration-300 focus:outline-none shadow-inner ${item.isOk ? 'bg-green-500' : 'bg-gray-300'}`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white shadow absolute top-1 transition-transform duration-300 ${item.isOk ? 'left-8' : 'left-1'}`} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Controls */}
      <div className="bg-white border-t border-gray-200 p-4 shrink-0 flex items-center justify-between shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <div className="flex items-center space-x-12 pl-8">
          <div className="flex items-center space-x-3">
            <span className="font-bold text-[#1e3b5f]">综合判定结果：</span>
            <button 
              onClick={() => setOverallOk(!overallOk)}
              className={`w-16 h-8 rounded-full relative transition-colors duration-300 focus:outline-none shadow-inner ${overallOk ? 'bg-green-500' : 'bg-gray-300'}`}
            >
              <div className={`w-6 h-6 rounded-full bg-white shadow absolute top-1 transition-transform duration-300 ${overallOk ? 'left-9' : 'left-1'}`} />
            </button>
          </div>
          
          <label className="flex items-center space-x-2 cursor-pointer group">
            <input 
              type="checkbox" 
              checked={autoInspect} 
              onChange={() => setAutoInspect(!autoInspect)}
              className="w-5 h-5 rounded border-gray-300 text-[#1976d2] focus:ring-[#1976d2] cursor-pointer" 
            />
            <span className="font-bold text-[#1e3b5f] group-hover:text-[#1976d2] transition-colors">工控机自动检测</span>
          </label>
        </div>
        
        <button 
          onClick={() => { alert('保存成功！'); onBack(); }}
          className="bg-[#1976d2] hover:bg-[#1565c0] text-white px-8 py-3 rounded shadow-sm font-bold tracking-wider transition-colors flex items-center"
        >
          <Save className="mr-2" size={20} />
          保存检验信息
        </button>
      </div>
    </div>
  );
};

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [moldRecords, setMoldRecords] = useState<MoldRecord[]>(mockMoldRecords);
  const [moldInventory, setMoldInventory] = useState<MoldInventory[]>(mockMoldInventory);
  
  // Selection
  const [selectedTaskIds, setSelectedTaskIds] = useState<string[]>([]);
  const [activeEquipment, setActiveEquipment] = useState('E5'); 

  // Modals
  const [showMoldModal, setShowMoldModal] = useState<'mount' | 'unmount' | 'requisition' | 'return' | null>(null);
  const [showSpoolModal, setShowSpoolModal] = useState(false);
  const [showOnlineInspectionModal, setShowOnlineInspectionModal] = useState(false);
  const [selectedDefectImage, setSelectedDefectImage] = useState<string | null>(null);
  const [spoolInput, setSpoolInput] = useState('');
  const [boundSpoolTasks, setBoundSpoolTasks] = useState<Record<string, string>>({});
  const [showSpoolError, setShowSpoolError] = useState<{show: boolean, message: string}>({show: false, message: ''});
  const [moldInput, setMoldInput] = useState('');
  const [lifeWarningData, setLifeWarningData] = useState<{
    moldId: string;
    mold: MoldInventory;
    estimatedCost: number;
    remainingQty: number;
  } | null>(null);
  
  // Requisition selections
  const [selectedInventoryMold, setSelectedInventoryMold] = useState<string>('');

  const handleBack = () => {
    setCurrentView('home');
    setSelectedTaskIds([]);
  };

  const toggleTaskSelection = (id: string) => {
    // For this example, we allow single selection for simplicity when showing details/molds
    setSelectedTaskIds([id]);
  };

  const handleSpoolBind = () => {
    const spInput = spoolInput.trim();
    if (!spInput || selectedTaskIds.length === 0) return;

    // Check if any selected task is already bound
    const alreadyBoundTasks = selectedTaskIds.filter(id => !!boundSpoolTasks[id]);
    
    if (alreadyBoundTasks.length > 0) {
      setShowSpoolError({
        show: true,
        message: `派工单已绑定盘具，上盘失败！已绑定派工单：${alreadyBoundTasks.join(', ')}`
      });
      return;
    }

    // Success binding
    const newBindings = { ...boundSpoolTasks };
    selectedTaskIds.forEach(id => {
      newBindings[id] = spInput;
    });
    setBoundSpoolTasks(newBindings);
    
    alert(`已成功绑定盘具[${spInput}] 至派工单: ${selectedTaskIds.join(', ')}`);
    setSpoolInput('');
    setShowSpoolModal(false);
  };

  const handleMoldSubmit = (overrideMoldId?: string, forceMount: boolean = false) => {
    const finalMoldId = (typeof overrideMoldId === 'string' ? overrideMoldId : moldInput).toUpperCase();
    
    // 归还操作不需要选中任务
    if (!finalMoldId) return;
    if (showMoldModal !== 'return' && selectedTaskIds.length === 0) return;
    
    // 验证模具是否存在
    const matchedMold = moldInventory.find(m => m.id === finalMoldId);
    if (!matchedMold) {
      alert(`错误：系统未找到编号为 [${finalMoldId}] 的模具`);
      return;
    }

    // 上模时的寿命检查
    if (showMoldModal === 'mount' && selectedTask && !forceMount) {
      const remainingQty = selectedTask.planQty - selectedTask.reportQty;
      const estimatedLifeCost = remainingQty * 1.5; // 预估每单位消耗1.5%寿命 (示例系数)
      
      if (matchedMold.remainingLife < estimatedLifeCost) {
        setLifeWarningData({
          moldId: finalMoldId,
          mold: matchedMold,
          estimatedCost: estimatedLifeCost,
          remainingQty: remainingQty
        });
        return;
      }
    }
    
    const newRecord: MoldRecord = {
      id: `M${Date.now()}`,
      taskId: selectedTaskIds[0] || 'INDEPENDENT',
      action: showMoldModal!,
      moldId: finalMoldId,
      operator: '管理员',
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };

    setMoldRecords([...moldRecords, newRecord]);
    
    if (showMoldModal === 'requisition' || showMoldModal === 'mount') {
      setMoldInventory(prev => prev.map(m => m.id === finalMoldId ? { ...m, status: 'in-use' } : m));
      if (showMoldModal === 'mount') {
        setTasks(prev => prev.map(t => t.id === selectedTask?.id ? { ...t, moldStatus: '已上模' } : t));
      }
    } else if (showMoldModal === 'unmount' || showMoldModal === 'return') {
      setMoldInventory(prev => prev.map(m => m.id === finalMoldId ? { ...m, status: 'available' } : m));
      if (showMoldModal === 'unmount') {
        setTasks(prev => prev.map(t => t.id === selectedTask?.id ? { ...t, moldStatus: '未上模' } : t));
      }
    }

    setMoldInput('');
    setSelectedInventoryMold('');
    setShowMoldModal(null);
    let actionText = '上模';
    if (showMoldModal === 'unmount') actionText = '下模';
    if (showMoldModal === 'requisition') actionText = '领用';
    if (showMoldModal === 'return') actionText = '归还';
    alert(`${actionText}记录成功: ${finalMoldId}`);
  };

  const selectedTask = tasks.find(t => t.id === selectedTaskIds[0]);

  return (
    <div className="flex flex-col h-screen bg-[#f3f4f6] font-sans text-gray-800">
      
      {/* Header */}
      {currentView !== 'storage-apply' && currentView !== 'inspect' && currentView !== 'patrol-inspection' && currentView !== 'exception-lock' && currentView !== 'self-inspection' && currentView !== 'equip-accept' && currentView !== 'material-substitute' && currentView !== 'tail-weigh' && currentView !== 'standalone-weigh' && currentView !== 'scrap-storage' && currentView !== 'scrap-handover' && currentView !== 'ncr' && currentView !== 'task-details' && currentView !== 'production-report' && currentView !== 'material-load' && currentView !== 'unload' && currentView !== 'handover-material-load' && currentView !== 'product-handover' && (
        <Header 
          title={currentView === 'home' ? '生产工位机终端' : 
                 currentView === 'tasks' ? '我的任务' : 
                 currentView === 'scrap' ? '废品归集' : 
                 currentView === 'equip-check' ? '设备点检' : 
                 currentView === 'equip-repair' ? '设备报修' : 
                 currentView === 'equip-fix' ? '设备维修' : 
                 currentView === 'equip-accept' ? '设备验收' : '生产工位机终端'} 
          onBack={currentView !== 'home' ? handleBack : undefined}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden relative flex flex-col">
        {currentView === 'home' && (
          <HomeMenu onNavigate={setCurrentView} />
        )}
        
        {currentView === 'inspect' && (
          <InspectView onBack={() => setCurrentView('home')} />
        )}

        {currentView === 'storage-apply' && (
          <StorageApplyView onBack={() => setCurrentView('home')} />
        )}

        {currentView === 'scrap' && (
          <div className="flex flex-col h-full bg-white overflow-y-auto p-6">
            <div className="max-w-5xl mx-auto w-full">
              <div className="flex justify-between items-center mb-8 pb-4 border-b">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                  <Archive className="mr-3 text-gray-500" />
                  废品归集
                </h2>
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2 text-sm text-gray-600">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span>显示通讯端口设置</span>
                  </label>
                  <label className="flex items-center space-x-2 text-sm text-gray-600">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span>打印汇总标签</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
                {/* Row 1 */}
                <div className="flex flex-col">
                  <label className="text-sm font-bold text-gray-700 mb-1">废品类型</label>
                  <select className="border border-gray-300 rounded-md px-3 py-2 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>铜基废焊带</option>
                    <option>紫铜废边角料</option>
                    <option>废铝线</option>
                  </select>
                </div>

                <div className="flex flex-col relative z-20">
                  <label className="text-sm font-bold text-gray-700 mb-1">派工单</label>
                  <select className="border border-gray-300 rounded-md px-3 py-2 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>均摊扣料</option>
                    {tasks.map(t => (
                      <option key={t.id} value={t.id}>{t.id} {t.spec}</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col items-center justify-center">
                   <span className="text-red-500 font-bold text-xl tracking-widest">废品称重</span>
                </div>

                {/* Row 2 */}
                <div className="flex flex-col">
                  <label className="text-sm font-bold text-gray-700 mb-1">报废类型</label>
                  <select className="border border-gray-300 rounded-md px-3 py-2 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>生产报废</option>
                    <option>调试报废</option>
                    <option>检验报废</option>
                  </select>
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-bold text-gray-700 mb-1">规格</label>
                  <div className="px-3 py-2 bg-gray-100 rounded-md border border-gray-200 text-gray-500 h-10">
                    {/* Auto populated normally */}
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-bold text-gray-700 mb-1">物料名称</label>
                  <div className="px-3 py-2 bg-gray-100 rounded-md border border-gray-200 text-gray-500 h-10">
                    铜基废焊带
                  </div>
                </div>

                {/* Row 3 */}
                <div className="flex flex-col">
                  <label className="text-sm font-bold text-gray-700 mb-1">报废原因</label>
                  <select className="border border-gray-300 rounded-md px-3 py-2 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>换规格</option>
                    <option>断线</option>
                    <option>绝缘损坏</option>
                    <option>起皮</option>
                  </select>
                </div>

                {/* Empty columns to align with previous rows visually if needed, but per image it's a flow */}
                <div className="col-span-2"></div>

                {/* Row 4 */}
                <div className="flex flex-col">
                  <label className="text-sm font-bold text-gray-700 mb-1">废品长度</label>
                  <div className="flex items-center space-x-2">
                    <input type="number" defaultValue={0} className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-right" />
                    <span className="font-bold text-gray-700 w-8">千米</span>
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-bold text-gray-700 mb-1">报废重量</label>
                  <div className="flex items-center space-x-2">
                    <input type="number" defaultValue={0} step="0.01" className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-right" />
                    <span className="font-bold text-gray-700 w-8">千克</span>
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-bold text-gray-700 mb-1">批号</label>
                  <input type="text" defaultValue="20260509" className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>

                {/* Row 5 */}
                <div className="flex flex-col">
                  <label className="text-sm font-bold text-gray-700 mb-1">汇报人</label>
                  <div className="relative">
                    <input type="text" defaultValue="管理员" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <button className="absolute right-2 top-2 text-gray-500 hover:text-blue-600">
                      <Search size={20} />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col md:col-span-1">
                   <label className="text-sm font-bold text-gray-700 mb-1">备注</label>
                   <textarea rows={2} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"></textarea>
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-bold text-gray-700 mb-1">报废时间</label>
                  <input type="datetime-local" defaultValue="2026-05-09T16:05" className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-12 flex justify-end">
                <button 
                  onClick={() => alert('保存成功！')}
                  className="bg-[#1976d2] hover:bg-[#1565c0] text-white px-12 py-3 rounded text-lg font-bold shadow-md transition-colors"
                >
                  保存
                </button>
              </div>
            </div>
          </div>
        )}

        {currentView === 'equip-check' && (
          <EquipCheckView onNavigate={setCurrentView} />
        )}

        {currentView === 'equip-repair' && (
          <EquipmentRepairView />
        )}

        {currentView === 'equip-fix' && (
          <EquipFixView />
        )}

        {currentView === 'equip-accept' && (
          <EquipAcceptView onBack={() => setCurrentView('home')} />
        )}

        {currentView === 'tasks' && (
          <div className="flex flex-col h-full bg-white">
            {/* Equipment Tabs */}
            <div className="flex bg-gray-100 p-2 space-x-2 shrink-0 border-b">
              {mockEquipments.map(eq => (
                <button
                  key={eq.id}
                  onClick={() => setActiveEquipment(eq.id)}
                  className={`px-6 py-2 rounded text-sm font-medium ${
                    activeEquipment === eq.id 
                      ? 'bg-[#1976d2] text-white shadow-sm' 
                      : 'bg-white text-gray-600 border hover:bg-gray-50'
                  }`}
                >
                  {eq.name}
                </button>
              ))}
            </div>

            {/* Filter Bar */}
            <div className="flex items-center p-3 space-x-4 border-b text-sm shrink-0">
              <div className="flex items-center space-x-2">
                <label className="text-gray-500">规格</label>
                <input type="text" className="border rounded px-2 py-1 w-24 outline-none focus:border-blue-500" />
              </div>
              <div className="flex items-center space-x-2">
                <label className="text-gray-500">型号</label>
                <input type="text" className="border rounded px-2 py-1 w-24 outline-none focus:border-blue-500" />
              </div>
              <div className="flex items-center space-x-2">
                <label className="text-gray-500">计划完工时间</label>
                <input type="date" className="border rounded px-2 py-1 outline-none text-gray-600 focus:border-blue-500" />
                <span className="text-gray-400">-</span>
                <input type="date" className="border rounded px-2 py-1 outline-none text-gray-600 focus:border-blue-500" />
              </div>
              <button className="bg-[#1976d2] text-white p-1.5 rounded hover:bg-[#1565c0]">
                <Search size={18} />
              </button>
              <button className="border text-gray-500 p-1.5 rounded hover:bg-gray-100">
                <RefreshCw size={18} />
              </button>
            </div>

            {/* Table */}
            <div className="flex-1 overflow-auto">
              <table className="w-full text-sm text-left whitespace-nowrap">
                <thead className="bg-[#eef2f6] sticky top-0 text-gray-600 font-medium z-10 shadow-sm">
                  <tr>
                    <th className="px-4 py-3 border-b">派工单号</th>
                    <th className="px-4 py-3 border-b text-center">订单状态</th>
                    <th className="px-4 py-3 border-b text-center">上料状态</th>
                    <th className="px-4 py-3 border-b text-center">模具状态</th>
                    <th className="px-4 py-3 border-b">物料编码</th>
                    <th className="px-4 py-3 border-b">物料名称</th>
                    <th className="px-4 py-3 border-b text-right">计划数量</th>
                    <th className="px-4 py-3 border-b text-right">派工数量</th>
                    <th className="px-4 py-3 border-b text-center">单位</th>
                    <th className="px-4 py-3 border-b">工序</th>
                    <th className="px-4 py-3 border-b">规格</th>
                    <th className="px-4 py-3 border-b">型号</th>
                    <th className="px-4 py-3 border-b">计划开工时间</th>
                    <th className="px-4 py-3 border-b">计划完工时间</th>
                    <th className="px-4 py-3 border-b">备注</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map(task => {
                    const isSelected = selectedTaskIds.includes(task.id);
                    return (
                      <tr 
                        key={task.id} 
                        onClick={() => toggleTaskSelection(task.id)}
                        className={`cursor-pointer border-b last:border-0 hover:bg-gray-50 transition-colors ${
                          isSelected ? 'bg-yellow-100 hover:bg-yellow-100' : ''
                        }`}
                      >
                        <td className="px-4 py-3 text-blue-600 font-medium">{task.id}</td>
                        <td className="px-4 py-3 text-center">
                          <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                            task.orderStatus === '已开工' ? 'bg-green-100 text-green-700' : task.orderStatus === '已暂停' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                          }`}>
                            {task.orderStatus || '未开工'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                            task.materialLoadStatus === '已上料' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                          }`}>
                            {task.materialLoadStatus || '未上料'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                            task.moldStatus === '已上模' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                          }`}>
                            {task.moldStatus || '未上模'}
                          </span>
                        </td>
                        <td className="px-4 py-3">{task.materialCode}</td>
                        <td className="px-4 py-3">{task.materialName}</td>
                        <td className="px-4 py-3 text-right">{task.planQty}</td>
                        <td className="px-4 py-3 text-right">{task.dispatchQty}</td>
                        <td className="px-4 py-3 text-center text-gray-500">{task.unit}</td>
                        <td className="px-4 py-3">{task.process}</td>
                        <td className="px-4 py-3">{task.spec}</td>
                        <td className="px-4 py-3">{task.model}</td>
                        <td className="px-4 py-3 text-gray-500">{task.planStartTime}</td>
                        <td className="px-4 py-3 text-gray-500">{task.planEndTime}</td>
                        <td className="px-4 py-3 text-gray-400">{task.notes || '-'}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {tasks.length === 0 && (
                <div className="text-center text-gray-400 mt-20">暂无更多数据</div>
              )}
            </div>

            {/* Bottom Actions Bar */}
            <div className="bg-[#1976d2] text-white p-2 flex shrink-0 space-x-2">
              <button 
                disabled={selectedTaskIds.length === 0}
                onClick={() => setCurrentView('task-details')}
                className="bg-white text-[#1976d2] disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 rounded font-medium flex items-center space-x-1"
              >
                <Info size={18} />
                <span>任务详情</span>
              </button>
              
              <div className="w-px bg-blue-400 mx-2 self-stretch"></div>

              <button 
                disabled={selectedTaskIds.length === 0}
                onClick={() => setShowMoldModal('mount')}
                className="bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 rounded font-medium flex items-center space-x-1 transition-colors"
                title="需选中派工单"
              >
                <ActivatorIcon />
                <span>上模记录</span>
              </button>
              <button 
                disabled={selectedTaskIds.length === 0}
                onClick={() => setShowMoldModal('unmount')}
                className="bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 rounded font-medium flex items-center space-x-1 transition-colors"
                title="需选中派工单"
              >
                <DeactivatorIcon />
                <span>下模记录</span>
              </button>
              <button 
                disabled={selectedTaskIds.length === 0}
                onClick={() => setShowMoldModal('requisition')}
                className="bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 rounded font-medium flex items-center space-x-1 transition-colors"
                title="需选中派工单"
              >
                <Package size={18} />
                <span>模具领用</span>
              </button>
              <button 
                onClick={() => setShowMoldModal('return')}
                className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded font-medium flex items-center space-x-1 transition-colors"
              >
                <ArrowRightLeft size={18} className="rotate-90" />
                <span>模具归还</span>
              </button>
              
              <button 
                disabled={selectedTaskIds.length === 0}
                onClick={() => {
                  setTasks(prev => prev.map(t => 
                    selectedTaskIds.includes(t.id) ? { ...t, orderStatus: '已暂停' } : t
                  ));
                }}
                className="bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 rounded font-medium flex items-center space-x-1 transition-colors"
                title="需选中派工单"
              >
                <Pause size={18} />
                <span>暂停</span>
              </button>
              
              <button 
                disabled={selectedTaskIds.length === 0}
                onClick={() => setShowSpoolModal(true)}
                className="bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 rounded font-medium flex items-center space-x-1 transition-colors"
                title="需选中派工单"
              >
                <Disc size={18} />
                <span>上盘</span>
              </button>
              
              <button 
                disabled={selectedTaskIds.length === 0}
                onClick={() => setShowOnlineInspectionModal(true)}
                className="bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 rounded font-medium flex items-center space-x-1 transition-colors"
                title="需选中派工单"
              >
                <Bug size={18} />
                <span>在线检测数据查询</span>
              </button>

              <div className="flex-1"></div>

              <button className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded font-medium flex items-center space-x-1">
                <Play size={18} />
                <span>开工</span>
              </button>
              <button className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded font-medium flex items-center space-x-1">
                <CheckCircle size={18} />
                <span>完工</span>
              </button>
            </div>
          </div>
        )}
        {currentView === 'task-details' && selectedTask && (
          <TaskExecutionView 
            task={selectedTask} 
            onBack={() => setCurrentView('tasks')} 
            onNavigate={setCurrentView} 
            onStartOrder={() => setTasks(prev => prev.map(t => t.id === selectedTask.id ? { ...t, orderStatus: '已开工' } : t))}
            onShowMoldModal={setShowMoldModal}
          />
        )}
        
        {currentView === 'instruction-manual' && (
          <InstructionManualView onBack={() => setCurrentView('task-details')} />
        )}
        
        {currentView === 'material-substitute' && selectedTask && (
          <MaterialSubstituteView task={selectedTask} onBack={() => setCurrentView('task-details')} />
        )}

        {currentView === 'replenish' && selectedTask && (
          <ReplenishView task={selectedTask} onBack={() => setCurrentView('task-details')} />
        )}
        
        {currentView === 'material-load' && selectedTask && (
          <MaterialLoadView 
            task={selectedTask} 
            onBack={() => setCurrentView('task-details')} 
            onNavigate={setCurrentView}
            onComplete={() => {
              setTasks(prev => prev.map(t => t.id === selectedTask.id ? { ...t, materialLoadStatus: '已上料' } : t));
              setCurrentView('task-details');
            }} 
            type="startup"
          />
        )}
        
        {currentView === 'unload' && selectedTask && (
          <UnloadView task={selectedTask} onBack={() => setCurrentView('task-details')} />
        )}
        
        {currentView === 'tail-weigh' && selectedTask && (
          <TailWeighView task={selectedTask} onBack={() => setCurrentView('task-details')} />
        )}
        
        {currentView === 'standalone-weigh' && selectedTask && (
          <WeighingStandaloneView task={selectedTask} onBack={() => setCurrentView('task-details')} />
        )}
        
        {currentView === 'production-report' && selectedTask && (
          <ProductionReportView task={selectedTask} onBack={() => setCurrentView('task-details')} />
        )}
        
        {currentView === 'product-handover' && selectedTask && (
          <ProductHandoverView task={selectedTask} onBack={() => setCurrentView('task-details')} onNavigate={setCurrentView} />
        )}
        
        {currentView === 'ncr' && selectedTask && (
          <NCRIssueView task={selectedTask} onBack={() => setCurrentView('task-details')} />
        )}

        {currentView === 'scrap-storage' && (
          <ScrapStorageView onBack={() => setCurrentView('task-details')} />
        )}

        {currentView === 'scrap-handover' && (
          <ScrapHandoverView onBack={() => setCurrentView('task-details')} />
        )}

        {currentView === 'self-inspection' && (
          <SelfInspectionView onBack={() => setCurrentView('task-details')} />
        )}

        {currentView === 'exception-lock' && selectedTask && (
          <ExceptionLockView task={selectedTask} onBack={() => setCurrentView('task-details')} />
        )}

        {currentView === 'patrol-inspection' && (
          <PatrolInspectionView task={selectedTask} onBack={() => setCurrentView('home')} />
        )}
      </main>

      {/* Life Warning Modal */}
      {lifeWarningData && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[60] p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-[480px] flex flex-col overflow-hidden">
            <div className="p-4 bg-white border-b border-gray-200 flex items-center space-x-3 shrink-0">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                <AlertTriangle className="text-red-500" size={22} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#1e3b5f]">模具寿命不足预警</h3>
                <p className="text-sm text-[#1e3b5f]/80">模具固有寿命不足以支撑本次任务完工</p>
              </div>
            </div>
            
            <div className="p-6 flex-1 bg-white">
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-500 font-medium text-sm">模具编号</span>
                  <span className="font-bold text-gray-800 text-base">{lifeWarningData.moldId}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-500 font-medium text-sm">当前剩余寿命</span>
                  <span className="font-bold text-gray-800 text-base">{lifeWarningData.mold.remainingLife}%</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-500 font-medium text-sm">本次任务剩余生产量</span>
                  <span className="font-bold text-gray-800 text-base">{lifeWarningData.remainingQty} {selectedTask?.unit}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-500 font-medium text-sm">预计消耗寿命</span>
                  <span className="font-bold text-red-600 text-base">{lifeWarningData.estimatedCost.toFixed(1)}%</span>
                </div>
                
                <div className="mt-6 p-4 bg-red-50 rounded-md border border-red-200 text-sm text-red-700 leading-relaxed font-medium">
                  警告：如果继续执行上模，可能会在生产过程中造成模具损坏或产品质量问题。您确定要强制继续吗？
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-4 shrink-0">
              <button 
                onClick={() => setLifeWarningData(null)}
                className="px-6 py-2.5 bg-white border border-gray-300 rounded font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                取消上模
              </button>
              <button 
                onClick={() => {
                  const finalMold = lifeWarningData.moldId;
                  setLifeWarningData(null);
                  handleMoldSubmit(finalMold, true);
                }}
                className="px-6 py-2.5 bg-red-600 rounded font-bold text-white shadow-sm hover:bg-red-700 transition-colors flex items-center"
              >
                强制继续
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mold Operation Modal (Mount / Unmount) */}
      {(showMoldModal === 'mount' || showMoldModal === 'unmount' || showMoldModal === 'return') && (showMoldModal === 'return' || selectedTask) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg flex flex-col overflow-hidden">
            <div className="p-4 border-b bg-[#1e3b5f] text-white flex justify-between items-center shrink-0">
              <h3 className="text-lg font-bold flex items-center">
                <Package className="mr-2" size={20} />
                执行{showMoldModal === 'mount' ? '上模' : showMoldModal === 'unmount' ? '下模' : '模具归还'}操作
              </h3>
              <button 
                onClick={() => { setShowMoldModal(null); setMoldInput(''); }}
                className="text-white hover:text-gray-200 text-2xl leading-none"
              >
                &times;
              </button>
            </div>
            
            <div className="flex-1 flex overflow-hidden min-h-[400px]">
              <div className="w-full p-6 flex flex-col overflow-y-auto">
                <div className="mb-6">
                  <h4 className="text-sm font-bold text-gray-600 mb-2">系统会自动验证扫描的模具是否符合{showMoldModal === 'return' ? '归还' : '工艺'}要求</h4>
                  <div className="font-medium text-sm text-gray-500 mt-4 mb-2">第一步：核对{showMoldModal === 'return' ? '操作信息' : '派工单及工艺信息'}</div>
                  <div className="border rounded p-3 bg-gray-50 flex items-center">
                    {selectedTask ? (
                      <span className="font-bold text-gray-800">[当前任务] {selectedTask.id} | {selectedTask.materialName} ({selectedTask.spec})</span>
                    ) : (
                      <span className="font-bold text-gray-800 text-blue-600">独立归还模式：直接扫码将模具入库</span>
                    )}
                  </div>
                  
                  {showMoldModal !== 'return' && (
                    <div className="mt-3 border rounded p-3 bg-blue-50 border-blue-100 flex flex-col space-y-2 text-blue-800">
                      <div className="flex items-center space-x-2">
                        <Info size={16} className="text-blue-500 shrink-0" />
                        <span className="text-sm">工艺要求：需配套 <strong>{selectedTask.process}模</strong>，规格为 <strong>{selectedTask.spec}</strong>，型号为 <strong>{selectedTask.model}</strong></span>
                      </div>
                    </div>
                  )}

                  {showMoldModal === 'return' && (
                    <div className="mt-3 border rounded p-3 bg-orange-50 border-orange-100 flex flex-col space-y-2 text-orange-800">
                      <div className="flex items-center space-x-2">
                        <Info size={16} className="text-orange-500 shrink-0" />
                        <span className="text-sm">归还说明：将模具从工序线边仓退还至模具库，状态将变更为可再次领用。</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mb-6 flex-1">
                  <div className="font-medium text-sm text-gray-500 mb-2">第二步：扫码{showMoldModal === 'mount' ? '上模' : showMoldModal === 'unmount' ? '下模' : '归还'} (模具编号)</div>
                  <input 
                    type="text" 
                    value={moldInput}
                    onChange={(e) => setMoldInput(e.target.value)}
                    autoFocus
                    placeholder="请输入或扫描条码..."
                    className="w-full border-2 border-blue-500 rounded px-4 py-3 focus:outline-none bg-white text-gray-800 font-medium text-lg uppercase"
                  />

                  {/* 模具信息带出显示 */}
                  {(() => {
                    const matchedMold = moldInventory.find(m => m.id === moldInput.toUpperCase());
                    if (!matchedMold) return null;
                    return (
                      <div className="mt-4 p-4 border-2 border-green-100 rounded-lg bg-green-50 animate-in fade-in slide-in-from-top-2 duration-300">
                        <div className="flex items-center justify-between mb-3 pb-2 border-b border-green-200/50">
                          <span className="text-xs font-bold text-green-700 tracking-wider">验证通过：模具基本参数</span>
                          <span className="bg-green-600 text-white text-[10px] px-1.5 py-0.5 rounded uppercase">{matchedMold.status === 'available' ? '入库中' : '使用中'}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                          <div className="flex flex-col">
                            <span className="text-[10px] text-green-600 font-bold uppercase">模具名称</span>
                            <span className="text-sm font-bold text-gray-800">{matchedMold.type}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[10px] text-green-600 font-bold uppercase">型号</span>
                            <span className="text-sm font-bold text-gray-800">{matchedMold.model}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[10px] text-green-600 font-bold uppercase">规格参数</span>
                            <span className="text-sm font-bold text-gray-800">{matchedMold.spec}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[10px] text-green-600 font-bold uppercase">当前寿命</span>
                            <span className={`text-sm font-bold ${matchedMold.remainingLife < 15 ? 'text-red-500' : 'text-gray-800'}`}>
                              {matchedMold.remainingLife}%
                            </span>
                          </div>
                          {showMoldModal === 'mount' && selectedTask && (
                            <div className="col-span-2 mt-2 pt-2 border-t border-green-200/50 flex items-center justify-between">
                              <span className="text-[10px] text-blue-600 font-bold uppercase">任务完工后预估寿命</span>
                              <span className={`text-sm font-bold ${(matchedMold.remainingLife - (selectedTask.planQty - selectedTask.reportQty) * 1.5) < 0 ? 'text-red-600' : 'text-blue-700'}`}>
                                {Math.max(0, (matchedMold.remainingLife - (selectedTask.planQty - selectedTask.reportQty) * 1.5)).toFixed(1)}%
                                {(matchedMold.remainingLife - (selectedTask.planQty - selectedTask.reportQty) * 1.5) < 0 && (
                                  <span className="ml-2 text-[10px] bg-red-100 text-red-600 px-1 py-0.5 rounded">不足支撑</span>
                                )}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })()}
                </div>
                
                <button 
                  onClick={() => handleMoldSubmit()}
                  disabled={!moldInput || !moldInventory.some(m => m.id === moldInput.toUpperCase())}
                  className="mt-6 w-full bg-[#1976d2] hover:bg-[#1565c0] text-white px-6 py-3 rounded-lg font-bold disabled:opacity-40 disabled:bg-gray-400 transition-colors shadow-sm"
                >
                  确认{showMoldModal === 'mount' ? '上模' : showMoldModal === 'unmount' ? '下模' : '模具归还'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showMoldModal === 'requisition' && selectedTask && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg flex flex-col overflow-hidden">
            <div className="p-4 border-b bg-[#1e3b5f] text-white flex justify-between items-center shrink-0">
              <h3 className="text-lg font-bold flex items-center">
                <Package className="mr-2" size={20} />
                依据派工单领用模具
              </h3>
              <button onClick={() => { setShowMoldModal(null); setMoldInput(''); setSelectedInventoryMold(''); }} className="text-white hover:text-gray-200 text-2xl leading-none">&times;</button>
            </div>
            <div className="flex-1 flex overflow-hidden min-h-[400px]">
              <div className="w-full p-6 flex flex-col overflow-y-auto">
                <div className="mb-6">
                  <h4 className="text-sm font-bold text-gray-600 mb-2">系统会自动为您筛选符合工艺要求的模具库存</h4>
                  <div className="font-medium text-sm text-gray-500 mt-4 mb-2">第一步：待产派工单</div>
                  <div className="border rounded p-3 bg-gray-50 flex items-center">
                    <span className="font-bold text-gray-800">[开工] {selectedTask.id} | {selectedTask.materialName} ({selectedTask.spec})</span>
                  </div>
                  
                  <div className="mt-3 border rounded p-3 bg-blue-50 border-blue-100 flex items-center space-x-2 text-blue-800">
                    <Info size={16} className="text-blue-500" />
                    <span className="text-sm">工艺要求：需配套 <strong>{selectedTask.process}模</strong>，规格为 <strong>{selectedTask.spec}</strong>，型号为 <strong>{selectedTask.model}</strong></span>
                  </div>
                </div>

                <div className="mb-6 flex-1">
                  <div className="font-medium text-sm text-gray-500 mb-2">第二步：选择匹配模具</div>
                  <div className="relative">
                    <select 
                      className="w-full border-2 border-blue-500 rounded px-3 py-2 appearance-none focus:outline-none bg-white text-gray-800 font-medium"
                      value={selectedInventoryMold}
                      onChange={(e) => setSelectedInventoryMold(e.target.value)}
                    >
                      <option value="">请选择需领用的模具编号...</option>
                      {moldInventory.filter(m => m.type.includes(selectedTask.process) && m.spec === selectedTask.spec && m.status === 'available').map(m => (
                        <option key={m.id} value={m.id}>{m.id} | {m.type} ({m.spec}) 寿命:{m.remainingLife}%</option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-blue-500">
                      <ChevronLeft size={16} className="-rotate-90" />
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    handleMoldSubmit(selectedInventoryMold);
                  }}
                  disabled={!selectedInventoryMold}
                  className="mt-6 w-full bg-[#1976d2] hover:bg-[#1565c0] text-white px-6 py-3 rounded-lg font-bold disabled:opacity-50 transition-colors shadow-sm"
                >
                  确认领用并生成锁定单
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showSpoolModal && selectedTaskIds.length > 0 && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg overflow-hidden flex flex-col">
            <div className="bg-[#1976d2] px-4 py-3 flex justify-between items-center text-white">
              <h3 className="font-bold flex items-center">
                <Disc className="mr-2" size={18} />
                产成品上盘
              </h3>
              <button onClick={() => { setShowSpoolModal(false); setSpoolInput(''); }} className="text-white hover:text-gray-200 text-2xl leading-none">&times;</button>
            </div>
            <div className="p-6">
              <div className="mb-4 text-sm text-[#1976d2] font-medium bg-blue-50 border border-blue-100 p-3 rounded flex items-start space-x-2">
                <Info size={16} className="shrink-0 mt-0.5" />
                <span>请确认待绑定的派工单，输入或使用扫码枪扫描盘具编号完成上盘操作。</span>
              </div>
              <div className="mb-5 bg-gray-50 border border-gray-200 p-3 rounded max-h-24 overflow-y-auto">
                <div className="font-bold text-gray-700 text-sm mb-1">已选派工单 ({selectedTaskIds.length}):</div>
                <div className="text-[#1976d2] font-mono text-sm leading-relaxed">
                  {selectedTaskIds.join(', ')}
                </div>
              </div>
              <div className="mb-6">
                <label className="text-sm font-bold text-gray-700 mb-2 block">扫描或手工录入盘具号：</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Barcode size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    autoFocus
                    value={spoolInput}
                    onChange={(e) => {
                      setSpoolInput(e.target.value);
                      if (showSpoolError.show) setShowSpoolError({show: false, message: ''});
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSpoolBind();
                      }
                    }}
                    className="pl-10 w-full border-2 border-[#1976d2] outline-none rounded p-3 text-lg font-mono focus:border-[#1565c0] focus:ring-4 focus:ring-blue-100 transition-all shadow-inner uppercase tracking-wider text-gray-800"
                    placeholder="如: SP-10254"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <ScanLine size={20} className="text-[#1976d2]" />
                  </div>
                </div>
                {showSpoolError.show && (
                  <div className="mt-2 text-sm text-red-600 bg-red-50 border border-red-200 p-2 rounded flex items-center space-x-2">
                    <AlertTriangle size={16} />
                    <span>{showSpoolError.message}</span>
                  </div>
                )}
              </div>
              
              <button 
                disabled={!spoolInput.trim()}
                onClick={handleSpoolBind}
                className="w-full bg-[#1976d2] hover:bg-[#1565c0] text-white py-3 rounded text-[15px] font-bold shadow-sm disabled:opacity-50 transition-colors flex items-center justify-center space-x-2"
              >
                <Disc size={18} />
                <span>确认上盘绑定</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {showOnlineInspectionModal && selectedTaskIds.length > 0 && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded shadow-2xl w-full max-w-7xl max-h-[90vh] flex flex-col pt-2">
            <div className="flex justify-between items-center p-4 py-2">
              <h3 className="text-lg font-bold flex items-center text-gray-800">
                在线检测结果
              </h3>
              <button 
                onClick={() => setShowOnlineInspectionModal(false)}
                className="text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                <XCircle size={24} />
              </button>
            </div>
            <div className="flex-1 overflow-auto bg-gray-50 px-6 py-4">
              <div className="bg-white overflow-hidden border border-gray-200">
                <table className="w-full text-[13px] text-center">
                  <thead className="bg-[#435ff3] text-white">
                    <tr>
                      <th className="px-4 py-3 font-medium border-b border-[#3b54b8]">检测时间</th>
                      <th className="px-4 py-3 font-medium border-b border-[#3b54b8]">派工单号</th>
                      <th className="px-4 py-3 font-medium border-b border-[#3b54b8]">盘具号</th>
                      <th className="px-4 py-3 font-medium border-b border-[#3b54b8]">缺陷编码</th>
                      <th className="px-4 py-3 font-medium border-b border-[#3b54b8]">缺陷名称</th>
                      <th className="px-4 py-3 font-medium border-b border-[#3b54b8]">缺陷等级</th>
                      <th className="px-4 py-3 font-medium border-b border-[#3b54b8]">缺陷出现位置(m)</th>
                      <th className="px-4 py-3 font-medium border-b border-[#3b54b8]">缺陷图片名称</th>
                      <th className="px-4 py-3 font-medium border-b border-[#3b54b8]">机台号</th>
                      <th className="px-4 py-3 font-medium border-b border-[#3b54b8]">操作工</th>
                      <th className="px-4 py-3 font-medium border-b border-[#3b54b8]">操作</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {mockOnlineInspectionData.filter(d => selectedTaskIds.includes(d.taskId)).length > 0 ? (
                      mockOnlineInspectionData.filter(d => selectedTaskIds.includes(d.taskId)).map(record => (
                        <tr key={record.id} className="hover:bg-blue-50/50 transition-colors">
                          <td className="px-4 py-3 font-mono text-gray-600">{record.time}</td>
                          <td className="px-4 py-3 text-gray-700">{record.taskId}</td>
                          <td className="px-4 py-3 text-gray-700">{record.spoolNo}</td>
                          <td className="px-4 py-3 text-gray-700">{record.defectCode}</td>
                          <td className="px-4 py-3 text-gray-800">{record.defectName}</td>
                          <td className="px-4 py-3 font-bold">
                            <span className={`${
                              record.defectLevel === '严重' ? 'text-red-500' :
                              record.defectLevel === '一般' ? 'text-orange-500' :
                              'text-yellow-600'
                            }`}>
                              {record.defectLevel}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-gray-700">{record.defectPosition}</td>
                          <td 
                            className="px-4 py-3 text-blue-600 hover:text-blue-800 hover:underline cursor-pointer font-medium transition-colors"
                            onClick={() => setSelectedDefectImage(record.defectImage)}
                          >
                            {record.defectImage}
                          </td>
                          <td className="px-4 py-3 text-gray-700">{record.machineId}</td>
                          <td className="px-4 py-3 text-gray-700">{record.operator}</td>
                          <td className="px-4 py-3 text-[#435ff3] hover:underline cursor-pointer">详情</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={11} className="px-4 py-8 text-gray-400 text-center">当前派工单暂无在线检测数据</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-end mt-3 text-[13px] text-gray-500 mb-2">
                <span>共 {mockOnlineInspectionData.filter(d => selectedTaskIds.includes(d.taskId)).length} 条缺陷记录 | 数据来源: 在线检测系统接口 | 更新时间: {new Date().toISOString().slice(0, 16).replace('T', ' ')}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Defect Image Preview Modal */}
      {selectedDefectImage && (
        <div className="fixed inset-0 bg-black/80 z-[60] flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setSelectedDefectImage(null)}>
          <div className="bg-[#1e1e24] shadow-[0_0_40px_rgba(0,0,0,0.5)] rounded-lg overflow-hidden max-w-4xl w-full flex flex-col border border-gray-700 animate-in fade-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center px-5 py-3 bg-black text-white border-b border-gray-800">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="font-mono text-sm tracking-widest text-emerald-400">尖刀视在线检测系统 - 缺陷留存图片捕捉识别</span>
              </div>
              <button onClick={() => setSelectedDefectImage(null)} className="text-gray-400 hover:text-white transition-colors focus:outline-none">
                <XCircle size={22} strokeWidth={1.5} />
              </button>
            </div>
            <div className="px-6 py-6 flex flex-col items-center flex-1">
              <div className="w-full flex justify-between items-end mb-4">
                <div>
                  <div className="text-gray-200 font-bold text-xl drop-shadow-md">{selectedDefectImage}</div>
                  <div className="text-gray-400 text-xs font-mono mt-1">在线连续监测采集节点: {mockOnlineInspectionData.find(d => d.defectImage === selectedDefectImage)?.time || 'N/A'}</div>
                </div>
                <div className="bg-red-500/10 border border-red-500/30 text-red-500 px-3 py-1 text-xs font-bold rounded flex items-center shadow-sm">
                  <span className="mr-1">⚠️</span> 
                  {mockOnlineInspectionData.find(d => d.defectImage === selectedDefectImage)?.defectName || '缺陷判定'}
                </div>
              </div>
              
              {/* Simulated Image Area */}
              <div className="relative w-full aspect-[16/9] bg-[#0a0a0c] rounded shadow-inner border border-gray-800 overflow-hidden group">
                {/* Visual scanline/grid overlay for system effect */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.3)_50%),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:100%_4px,20px_20px,20px_20px] pointer-events-none z-20"></div>
                
                {/* Dummy representation of a copper wire surface */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#111116] via-[#3d271d] to-[#111116] opacity-80 flex items-center justify-center">
                  <div className="w-full h-[60%] bg-gradient-to-b from-[#2a1711] via-[#8c4a2f] to-[#2a1711] rounded-[100px_100px_100px_100px] shadow-[inset_0_20px_50px_rgba(0,0,0,0.5),0_10px_20px_rgba(0,0,0,0.8)] relative overflow-hidden">
                     {/* Reflection highlight */}
                     <div className="absolute top-[15%] left-0 w-full h-[15%] bg-gradient-to-b from-white/10 to-transparent blur-[4px]"></div>
                     
                     {/* Defect spot simulation */}
                     <div className="absolute top-[40%] left-[45%] w-[4%] h-[15%] bg-[#1a0f0a] rounded-full drop-shadow-[0_0_2px_rgba(0,0,0,1)] border border-[#000000]"></div>
                  </div>
                </div>

                {/* AI Bounding Box */}
                <div className="absolute top-[35%] left-[40%] w-[15%] h-[30%] border-[1.5px] border-red-500 bg-red-500/10 flex flex-col items-start justify-start p-1 z-30 shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                  <span className="text-red-500 bg-black/80 text-[10px] font-mono px-1.5 py-0.5 whitespace-nowrap tracking-wider">
                    {mockOnlineInspectionData.find(d => d.defectImage === selectedDefectImage)?.defectCode || 'ERR_DETECT'} 
                    - CONFIDENCE: {(Math.random() * 15 + 84).toFixed(1)}%
                  </span>
                </div>

                {/* Crosshairs & Metadata */}
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-emerald-500/20 z-10"></div>
                <div className="absolute top-0 left-1/2 w-[1px] h-full bg-emerald-500/20 z-10"></div>
                
                <div className="absolute bottom-3 left-4 text-emerald-500/60 font-mono text-[10px] z-30">
                  <p>SYS: JD-VISION CORE v4.2.0</p>
                  <p>LENS: CAM-04 (HI-RES OPTIC)</p>
                  <p>POS: {mockOnlineInspectionData.find(d => d.defectImage === selectedDefectImage)?.defectPosition || '0'}M</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// Helpers
const DetailItem = ({ label, value }: { label: string, value: React.ReactNode }) => (
  <div className="flex border-b border-gray-100 pb-2">
    <span className="w-1/3 text-gray-500 text-sm">{label}</span>
    <span className="w-2/3 text-gray-900 font-medium">{value}</span>
  </div>
);

const ActivatorIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
  </svg>
);

const DeactivatorIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/>
  </svg>
);
