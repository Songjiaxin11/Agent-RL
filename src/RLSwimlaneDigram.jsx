import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowDown, RefreshCw, Cpu, Brain, Database, Zap, Maximize2, Minimize2 } from 'lucide-react';

const RLSwimlaneDigram = () => {
    const [expandedSections, setExpandedSections] = useState(['init', 'task', 'llm', 'collect', 'update']);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);

    const sequence = [
        // Phase 1: Init
        { id: 'init-1', section: 'init' }, // Upload Dataset
        { id: 'init-2', section: 'init' }, // Start Server
        { id: 'init-3', section: 'init' }, // Receive Model
        // Phase 2: Task
        { id: 'task-4', section: 'task' }, // Request Resource
        { id: 'task-5', section: 'task' }, // Assign Task
        { id: 'task-6', section: 'task' }, // Route & Receive
        // Phase 3: LLM Loop (Iteration 1)
        { id: 'llm-7', section: 'llm' }, // Prompt
        { id: 'llm-inf', section: 'llm' }, // Inference
        { id: 'llm-8', section: 'llm' }, // Return Action
        { id: 'llm-exec', section: 'llm' }, // Execute
        // Phase 3: LLM Loop (Iteration 2)
        { id: 'llm-7', section: 'llm' },
        { id: 'llm-inf', section: 'llm' },
        { id: 'llm-8', section: 'llm' },
        { id: 'llm-exec', section: 'llm' },
        // Phase 4: Collect
        { id: 'collect-9', section: 'collect' }, // Upload Trajectory
        { id: 'collect-10', section: 'collect' }, // Forward Batch
        { id: 'collect-11', section: 'collect' }, // Batch Processing
        // Phase 5: Update
        { id: 'update-12', section: 'update' }, // Gradient Update
        { id: 'update-13', section: 'update' }, // Sync Model
    ];

    useEffect(() => {
        if (!isPlaying) return;
        const timer = setInterval(() => {
            setCurrentStepIndex(prev => (prev + 1) % sequence.length);
        }, 1500);
        return () => clearInterval(timer);
    }, [isPlaying]);

    const currentStep = sequence[currentStepIndex];

    const toggleSection = (section) => {
        setExpandedSections(prev =>
            prev.includes(section)
                ? prev.filter(s => s !== section)
                : [...prev, section]
        );
    };

    const expandAll = () => {
        setExpandedSections(['init', 'task', 'llm', 'collect', 'update']);
    };

    const collapseAll = () => {
        setExpandedSections([]);
    };

    const isExpanded = (section) => expandedSections.includes(section);

    const getStyle = (id) => {
        const isActive = currentStep.id === id;
        return `transition-all duration-500 transform ${isActive
            ? 'opacity-100 scale-105 ring-4 ring-blue-400 shadow-xl bg-white z-10'
            : 'opacity-40 grayscale scale-100'
            }`;
    };

    return (
        <div className="w-full max-w-7xl mx-auto p-6 bg-gray-50">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        强化学习系统交互流程 - 算法详解版 (GRPO)
                    </h2>
                    <p className="text-sm text-gray-600">
                        包含算法公式、状态转换和模型更新机制
                    </p>
                </div>
                <div className="flex gap-2 items-center">
                    <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className={`flex items-center px-4 py-2 rounded text-white transition-colors text-sm ${isPlaying ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                            }`}
                    >
                        {isPlaying ? '⏸ 暂停演示' : '▶ 继续演示'}
                    </button>
                    <button
                        onClick={expandAll}
                        className="flex items-center px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
                    >
                        <Maximize2 className="w-4 h-4 mr-2" />
                        全部展开
                    </button>
                    <button
                        onClick={collapseAll}
                        className="flex items-center px-3 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors text-sm"
                    >
                        <Minimize2 className="w-4 h-4 mr-2" />
                        全部收起
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-gray-300">
                {/* 泳道头部 */}
                <div className="grid grid-cols-4 border-b-2 border-gray-400">
                    <div className="bg-purple-100 p-4 border-r border-gray-300">
                        <div className="flex items-center justify-center">
                            <Brain className="w-5 h-5 mr-2 text-purple-700" />
                            <h3 className="font-bold text-purple-800">RL Framework</h3>
                        </div>
                    </div>
                    <div className="bg-blue-100 p-4 border-r border-gray-300">
                        <div className="flex items-center justify-center">
                            <Database className="w-5 h-5 mr-2 text-blue-700" />
                            <h3 className="font-bold text-blue-800">AL Server</h3>
                        </div>
                    </div>
                    <div className="bg-orange-100 p-4 border-r border-gray-300">
                        <div className="flex items-center justify-center">
                            <Cpu className="w-5 h-5 mr-2 text-orange-700" />
                            <h3 className="font-bold text-orange-800">AL Client</h3>
                        </div>
                    </div>
                    <div className="bg-green-100 p-4">
                        <div className="flex items-center justify-center">
                            <Zap className="w-5 h-5 mr-2 text-green-700" />
                            <h3 className="font-bold text-green-800">Agent</h3>
                        </div>
                    </div>
                </div>

                {/* 阶段1: 初始化 */}
                <div className={`border-b border-gray-200 bg-blue-50 transition-colors duration-300 ${currentStep.section === 'init' ? 'bg-blue-100' : ''}`}>
                    <div
                        className="p-2 bg-blue-200 font-semibold text-sm cursor-pointer hover:bg-blue-300 flex items-center justify-between"
                        onClick={() => toggleSection('init')}
                    >
                        <span>阶段1: 系统初始化</span>
                        <span className="text-xs">{isExpanded('init') ? '▼' : '▶'}</span>
                    </div>
                    <div className="grid grid-cols-4 min-h-32">
                        <div className="p-4 border-r border-gray-200">
                            {isExpanded('init') && (
                                <div className={`bg-purple-50 p-3 rounded border border-purple-200 text-xs ${getStyle('init-1')}`}>
                                    <div className="font-bold mb-1 text-purple-800">模型初始化:</div>
                                    <div className="font-mono">θ₀ ← random_init()</div>
                                    <div className="mt-2 text-gray-600">初始化策略网络参数</div>
                                </div>
                            )}
                        </div>
                        <div className="p-4 border-r border-gray-200 flex items-center justify-center">
                            <div className="text-center w-full">
                                <div className={`bg-blue-200 rounded px-3 py-2 text-sm inline-block ${getStyle('init-2')}`}>
                                    ② 启动RL服务器
                                </div>
                                {isExpanded('init') && (
                                    <div className={`mt-2 bg-blue-50 p-2 rounded text-xs border border-blue-200 ${getStyle('init-2')}`}>
                                        <div className="font-mono">Server.start()</div>
                                        <div className="text-gray-600 mt-1">加载预训练权重</div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="p-4 border-r border-gray-200">
                            <div className="space-y-3">
                                <div className={`bg-orange-200 rounded px-3 py-2 text-sm text-center ${getStyle('init-1')}`}>
                                    ① 上传数据集 D
                                </div>
                                {isExpanded('init') && (
                                    <div className={`bg-orange-50 p-2 rounded text-xs border border-orange-200 ${getStyle('init-1')}`}>
                                        <div className="font-mono">D = {'{τ₁, τ₂, ..., τₙ}'}</div>
                                        <div className="text-gray-600 mt-1">τ = (s, a, r, s')</div>
                                    </div>
                                )}
                                <ArrowRight className="w-4 h-4 mx-auto text-gray-600" />
                                <div className={`text-xs text-center text-gray-600 p-1 rounded ${getStyle('init-3')}`}>接收最新模型 θ₀ ③</div>
                            </div>
                        </div>
                        <div className="p-4"></div>
                    </div>
                </div>

                {/* 阶段2: 任务批次循环 */}
                <div className={`border-b border-gray-200 bg-green-50 transition-colors duration-300 ${currentStep.section === 'task' ? 'bg-green-100' : ''}`}>
                    <div
                        className="p-2 bg-green-200 font-semibold text-sm flex items-center justify-between cursor-pointer hover:bg-green-300"
                        onClick={() => toggleSection('task')}
                    >
                        <div className="flex items-center">
                            <RefreshCw className={`w-4 h-4 mr-2 ${currentStep.section === 'task' ? 'animate-spin' : ''}`} />
                            <span>阶段2: 任务分发 (每批任务循环)</span>
                        </div>
                        <span className="text-xs">{isExpanded('task') ? '▼' : '▶'}</span>
                    </div>
                    <div className="grid grid-cols-4 min-h-40">
                        <div className="p-4 border-r border-gray-200"></div>
                        <div className="p-4 border-r border-gray-200">
                            <div className="space-y-2">
                                <div className="text-xs text-center text-gray-600">接收资源请求 ④</div>
                                <ArrowDown className="w-4 h-4 mx-auto text-gray-600" />
                                <div className={`bg-blue-200 rounded px-3 py-2 text-sm text-center ${getStyle('task-5')}`}>
                                    ⑤ 分配: {'{Task, π_θ}'}
                                </div>
                                {isExpanded('task') && (
                                    <div className={`bg-blue-50 p-2 rounded text-xs border border-blue-200 mt-2 ${getStyle('task-5')}`}>
                                        <div className="font-bold text-blue-800">资源分配:</div>
                                        <div className="font-mono mt-1">Task ← sample(D)</div>
                                        <div className="font-mono">Model ← π_θ(a|s)</div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="p-4 border-r border-gray-200">
                            <div className="space-y-2">
                                <div className={`bg-orange-200 rounded px-3 py-2 text-sm text-center ${getStyle('task-4')}`}>
                                    ④ 请求资源
                                </div>
                                <ArrowRight className="w-4 h-4 mx-auto text-gray-600" />
                                <div className={`bg-orange-200 rounded px-3 py-2 text-sm text-center mt-3 ${getStyle('task-6')}`}>
                                    ⑥ 路由API调用
                                </div>
                            </div>
                        </div>
                        <div className="p-4 flex items-center justify-center">
                            <div className="text-center">
                                <div className={`text-xs text-gray-600 p-1 rounded ${getStyle('task-6')}`}>接收任务 ⑥</div>
                                {isExpanded('task') && (
                                    <div className={`bg-green-50 p-2 rounded text-xs border border-green-200 mt-2 ${getStyle('task-6')}`}>
                                        <div className="font-bold text-green-800">初始化状态:</div>
                                        <div className="font-mono">s₀ ← init_state</div>
                                        <div className="font-mono">t ← 0</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 阶段3: LLM调用循环 */}
                <div className={`border-b border-gray-200 bg-yellow-50 transition-colors duration-300 ${currentStep.section === 'llm' ? 'bg-yellow-100' : ''}`}>
                    <div
                        className="p-2 bg-yellow-200 font-semibold text-sm flex items-center justify-between cursor-pointer hover:bg-yellow-300"
                        onClick={() => toggleSection('llm')}
                    >
                        <div className="flex items-center">
                            <RefreshCw className={`w-4 h-4 mr-2 ${currentStep.section === 'llm' ? 'animate-spin' : ''}`} />
                            <span>阶段3: LLM推理循环 (每次调用)</span>
                        </div>
                        <span className="text-xs">{isExpanded('llm') ? '▼' : '▶'}</span>
                    </div>
                    <div className="grid grid-cols-4 min-h-48">
                        <div className="p-4 border-r border-gray-200">
                            <div className="space-y-2">
                                <div className={`text-xs text-center text-gray-600 p-1 rounded ${getStyle('llm-7')}`}>接收 Prompt(s_t) ⑦</div>
                                <ArrowDown className="w-4 h-4 mx-auto text-gray-600" />
                                <div className={`bg-purple-200 rounded px-3 py-2 text-sm text-center ${getStyle('llm-inf')}`}>
                                    推理过程
                                </div>
                                {isExpanded('llm') && (
                                    <div className={`bg-purple-50 p-3 rounded border border-purple-200 text-xs space-y-2 ${getStyle('llm-inf')}`}>
                                        <div className="font-bold text-purple-800">策略网络前向传播:</div>
                                        <div className="font-mono text-xs">a_t ~ π_θ(·|s_t)</div>
                                        <div className="font-mono">logit = f_θ(s_t)</div>
                                        <div className="font-mono">a_t = softmax(logit)</div>
                                        <div className="mt-2 text-gray-600">采样动作概率分布</div>
                                    </div>
                                )}
                                <ArrowDown className="w-4 h-4 mx-auto text-gray-600" />
                                <div className={`bg-purple-200 rounded px-3 py-2 text-sm text-center ${getStyle('llm-8')}`}>
                                    ⑧ 返回 a_t
                                </div>
                            </div>
                        </div>
                        <div className="p-4 border-r border-gray-200"></div>
                        <div className="p-4 border-r border-gray-200"></div>
                        <div className="p-4">
                            <div className="space-y-2">
                                <div className={`bg-green-200 rounded px-3 py-2 text-sm text-center ${getStyle('llm-7')}`}>
                                    ⑦ 构造 Prompt(s_t)
                                </div>
                                {isExpanded('llm') && (
                                    <div className={`bg-green-50 p-3 rounded border border-green-200 text-xs space-y-2 ${getStyle('llm-7')}`}>
                                        <div className="font-bold text-green-800">Agent状态机:</div>
                                        <div className="font-mono">State: IDLE → QUERY</div>
                                        <div className="font-mono">prompt = encode(s_t)</div>
                                        <div className="mt-2 border-t border-green-300 pt-2">
                                            <div className="font-bold">状态转换:</div>
                                            <div className="font-mono text-xs">s_{'{t+1}'} = T(s_t, a_t)</div>
                                            <div className="font-mono">r_t = R(s_t, a_t)</div>
                                        </div>
                                    </div>
                                )}
                                <div className="text-center text-gray-400 text-xs my-2">←→</div>
                                <div className={`text-xs text-center text-gray-600 p-1 rounded ${getStyle('llm-8')}`}>接收 a_t ⑧</div>
                                <ArrowDown className="w-4 h-4 mx-auto text-gray-600" />
                                <div className={`bg-green-200 rounded px-3 py-2 text-sm text-center ${getStyle('llm-exec')}`}>
                                    执行并记录
                                </div>
                                {isExpanded('llm') && (
                                    <div className={`bg-green-50 p-2 rounded text-xs border border-green-200 mt-2 ${getStyle('llm-exec')}`}>
                                        <div className="font-mono">τ_t = (s_t, a_t, r_t)</div>
                                        <div className="font-mono">t ← t + 1</div>
                                        <div className="text-gray-600 mt-1">记录轨迹元组</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 阶段4: 结果收集 */}
                <div className={`border-b border-gray-200 bg-purple-50 transition-colors duration-300 ${currentStep.section === 'collect' ? 'bg-purple-100' : ''}`}>
                    <div
                        className="p-2 bg-purple-200 font-semibold text-sm cursor-pointer hover:bg-purple-300 flex items-center justify-between"
                        onClick={() => toggleSection('collect')}
                    >
                        <span>阶段4: 结果收集与反馈</span>
                        <span className="text-xs">{isExpanded('collect') ? '▼' : '▶'}</span>
                    </div>
                    <div className="grid grid-cols-4 min-h-36">
                        <div className="p-4 border-r border-gray-200 flex items-center justify-center">
                            <div className="text-center">
                                <div className={`text-xs text-gray-600 p-1 rounded ${getStyle('collect-11')}`}>接收批次 B ⑪</div>
                                {isExpanded('collect') && (
                                    <div className={`bg-purple-50 p-2 rounded text-xs border border-purple-200 mt-2 ${getStyle('collect-11')}`}>
                                        <div className="font-mono">B = {'{τ₁, ..., τₘ}'}</div>
                                        <div className="text-gray-600 mt-1">批量轨迹数据</div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="p-4 border-r border-gray-200">
                            <div className="space-y-2">
                                <div className={`text-xs text-center text-gray-600 p-1 rounded ${getStyle('collect-10')}`}>聚合轨迹 ⑩</div>
                                <ArrowDown className="w-4 h-4 mx-auto text-gray-600" />
                                <div className={`bg-blue-200 rounded px-3 py-2 text-sm text-center ${getStyle('collect-11')}`}>
                                    ⑪ 批处理
                                </div>
                                {isExpanded('collect') && (
                                    <div className={`bg-blue-50 p-2 rounded text-xs border border-blue-200 mt-2 ${getStyle('collect-11')}`}>
                                        <div className="font-bold text-blue-800">数据预处理:</div>
                                        <div className="font-mono">normalize(B)</div>
                                        <div className="font-mono">compute_group_adv()</div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="p-4 border-r border-gray-200">
                            <div className="space-y-2">
                                <div className={`text-xs text-center text-gray-600 p-1 rounded ${getStyle('collect-9')}`}>缓存轨迹 ⑨</div>
                                <ArrowDown className="w-4 h-4 mx-auto text-gray-600" />
                                <div className={`bg-orange-200 rounded px-3 py-2 text-sm text-center ${getStyle('collect-10')}`}>
                                    ⑩ 转发批次
                                </div>
                            </div>
                        </div>
                        <div className="p-4">
                            <div className={`bg-green-200 rounded px-3 py-2 text-sm text-center ${getStyle('collect-9')}`}>
                                ⑨ 上传轨迹 τ
                            </div>
                            {isExpanded('collect') && (
                                <div className={`bg-green-50 p-2 rounded text-xs border border-green-200 mt-2 ${getStyle('collect-9')}`}>
                                    <div className="font-bold text-green-800">完整轨迹:</div>
                                    <div className="font-mono">τ = {'{(s₀,a₀,r₀),'}</div>
                                    <div className="font-mono ml-4">..., (s_T,a_T,r_T){'}'}</div>
                                    <div className="font-mono mt-1">G = Σ γᵗ rᵗ</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* 阶段5: 模型更新 */}
                <div className={`bg-orange-50 transition-colors duration-300 ${currentStep.section === 'update' ? 'bg-orange-100' : ''}`}>
                    <div
                        className="p-2 bg-orange-200 font-semibold text-sm cursor-pointer hover:bg-orange-300 flex items-center justify-between"
                        onClick={() => toggleSection('update')}
                    >
                        <span>阶段5: 模型更新</span>
                        <span className="text-xs">{isExpanded('update') ? '▼' : '▶'}</span>
                    </div>
                    <div className="grid grid-cols-4 min-h-40">
                        <div className="p-4 border-r border-gray-200">
                            <div className="space-y-2">
                                <div className={`bg-purple-200 rounded px-3 py-2 text-sm text-center ${getStyle('update-12')}`}>
                                    梯度更新
                                </div>
                                {isExpanded('update') && (
                                    <div className={`bg-purple-50 p-3 rounded border border-purple-200 text-xs space-y-2 ${getStyle('update-12')}`}>
                                        <div className="font-bold text-purple-800">GRPO算法更新:</div>
                                        <div className="font-mono text-xs">L(θ) = 𝔼[1/G Σ min(</div>
                                        <div className="font-mono ml-2">r_t(θ)A_i,</div>
                                        <div className="font-mono ml-2">clip(r_t,1±ε)A_i)]</div>
                                        <div className="mt-2 border-t border-purple-300 pt-2">
                                            <div className="font-mono">A_i = (r_i - mean(r))/std(r)</div>
                                            <div className="font-mono">r_t = π_θ/π_old</div>
                                        </div>
                                        <div className="mt-2 text-gray-600">组相对优势函数</div>
                                    </div>
                                )}
                                <ArrowDown className="w-4 h-4 mx-auto text-gray-600" />
                                <div className={`bg-purple-200 rounded px-3 py-2 text-sm text-center ${getStyle('update-12')}`}>
                                    ⑫ θ_{'{new}'}
                                </div>
                                {isExpanded('update') && (
                                    <div className={`bg-purple-50 p-2 rounded text-xs border border-purple-200 mt-2 ${getStyle('update-12')}`}>
                                        <div className="font-mono">θ ← θ - α∇L(θ)</div>
                                        <div className="text-gray-600 mt-1">Adam优化器</div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="p-4 border-r border-gray-200 flex items-center justify-center">
                            <div className="text-center">
                                <div className={`text-xs text-gray-600 p-1 rounded ${getStyle('update-13')}`}>同步模型 ⑫</div>
                                {isExpanded('update') && (
                                    <div className={`bg-blue-50 p-2 rounded text-xs border border-blue-200 mt-2 ${getStyle('update-13')}`}>
                                        <div className="font-bold text-blue-800">模型版本控制:</div>
                                        <div className="font-mono">v ← v + 1</div>
                                        <div className="font-mono">broadcast(θ_v)</div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="p-4 border-r border-gray-200"></div>
                        <div className="p-4"></div>
                    </div>
                </div>
            </div>

            {/* 算法符号说明 */}
            <div className="mt-6 p-5 bg-white rounded-lg shadow border border-gray-300">
                <h4 className="font-bold text-gray-800 mb-3 flex items-center">
                    <Brain className="w-5 h-5 mr-2" />
                    算法符号说明
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                    <div><span className="font-mono font-semibold">θ</span>: 策略网络参数</div>
                    <div><span className="font-mono font-semibold">π_θ(a|s)</span>: 策略函数</div>
                    <div><span className="font-mono font-semibold">G</span>: 采样组大小</div>
                    <div><span className="font-mono font-semibold">s_t, a_t, r_t</span>: 状态、动作、奖励</div>
                    <div><span className="font-mono font-semibold">τ</span>: 轨迹 (trajectory)</div>
                    <div><span className="font-mono font-semibold">G_t</span>: 累积回报</div>
                    <div><span className="font-mono font-semibold">A_i</span>: 组相对优势</div>
                    <div><span className="font-mono font-semibold">γ</span>: 折扣因子</div>
                    <div><span className="font-mono font-semibold">α</span>: 学习率</div>
                    <div><span className="font-mono font-semibold">ε</span>: GRPO裁剪参数</div>
                    <div><span className="font-mono font-semibold">B</span>: 批次 (batch)</div>
                    <div><span className="font-mono font-semibold">D</span>: 数据集</div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                    <h5 className="font-bold text-gray-700 mb-2">核心算法:</h5>
                    <div className="bg-gray-50 p-3 rounded text-xs space-y-1 font-mono border border-gray-200">
                        <div>1. 使用当前策略 π_θ 针对同一问题采样 G 个输出</div>
                        <div>2. 计算组相对优势 A_i = (r_i - mean(r)) / std(r)</div>
                        <div>3. 使用GRPO目标函数更新策略: L(θ) = 𝔼[1/G Σ min(r_t A_i, clip(r_t) A_i)]</div>
                        <div>4. 广播更新后的模型参数 θ</div>
                    </div>
                </div>
            </div>

            {/* 交互说明 */}
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200 text-sm">
                <div className="font-semibold text-blue-800 mb-2">💡 提示: 点击各阶段标题展开算法细节</div>
                <div className="text-gray-700">每个阶段包含具体的数学公式、状态转换和数据流向</div>
            </div>
        </div>
    );
};

export default RLSwimlaneDigram;
