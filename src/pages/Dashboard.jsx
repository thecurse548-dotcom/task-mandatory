import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";
import { Layout } from "../components/Layout";
import { Card } from "../components/ui/Card";
import { Loading } from "../components/ui/Loading";

export const Dashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0,
    overdue: 0,
  });
  const [recentTasks, setRecentTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();
  const { addToast } = useToast();

  const fetchDashboardData = useCallback(async () => {
    // Safety check: Don't fetch if user isn't loaded yet
    if (!user?.id) return;

    try {
      setLoading(true);
      const { data: tasks, error } = await supabase
        .from("tasks")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;

      const now = new Date();
      now.setHours(0, 0, 0, 0);

      const statsData = {
        total: tasks.length,
        pending: tasks.filter((t) => t.status === "pending").length,
        inProgress: tasks.filter((t) => t.status === "in_progress").length,
        completed: tasks.filter((t) => t.status === "completed").length,
        overdue: tasks.filter(
          (t) =>
            t.due_date && new Date(t.due_date) < now && t.status !== "completed"
        ).length,
      };

      setStats(statsData);
      setRecentTasks(tasks.slice(0, 5));
    } catch (error) {
      addToast("Failed to load dashboard data", "error");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [user, addToast]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const statCards = [
    {
      title: "Total Tasks",
      value: stats.total,
      icon: "📋",
      textColor: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      title: "Pending",
      value: stats.pending,
      icon: "⏳",
      textColor: "text-yellow-600 dark:text-yellow-400",
      bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
    },
    {
      title: "In Progress",
      value: stats.inProgress,
      icon: "🚀",
      textColor: "text-indigo-600 dark:text-indigo-400",
      bgColor: "bg-indigo-50 dark:bg-indigo-900/20",
    },
    {
      title: "Completed",
      value: stats.completed,
      icon: "✅",
      textColor: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-50 dark:bg-green-900/20",
    },
    {
      title: "Overdue",
      value: stats.overdue,
      icon: "⚠️",
      textColor: "text-red-600 dark:text-red-400",
      bgColor: "bg-red-50 dark:bg-red-900/20",
    },
  ];

  const getPriorityColor = (priority) => {
    const colors = {
      low: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
      medium:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
      high: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
    };
    return colors[priority] || colors.medium;
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
      in_progress:
        "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
      completed:
        "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    };
    return colors[status] || colors.pending;
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex h-[60vh] items-center justify-center">
          <Loading />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Dashboard
            </h1>
            <p className="mt-1 text-gray-600 dark:text-gray-400">
              Welcome back! Here's an overview of your tasks.
            </p>
          </div>
          <Link to="/tasks/new" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto flex items-center justify-center px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all active:scale-95 shadow-lg shadow-blue-500/20">
              <span className="mr-2">➕</span>
              New Task
            </button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {statCards.map((stat) => (
            <Card
              key={stat.title}
              className="p-5 border-none shadow-sm bg-white dark:bg-gray-800"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    {stat.title}
                  </p>
                  <p className={`text-3xl font-black mt-1 ${stat.textColor}`}>
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`text-2xl ${stat.bgColor} w-12 h-12 flex items-center justify-center rounded-2xl`}
                >
                  {stat.icon}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Recent Tasks Section */}
        <Card className="p-6 border-none shadow-md bg-white dark:bg-gray-800">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Recent Tasks
            </h2>
            <Link to="/tasks">
              <button className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 transition-colors">
                View All Tasks →
              </button>
            </Link>
          </div>

          {recentTasks.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 dark:bg-gray-700/30 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700">
              <p className="text-gray-500 dark:text-gray-400 mb-6 font-medium">
                No tasks found. Ready to stay organized?
              </p>
              <Link to="/tasks/new">
                <button className="px-6 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
                  Create Your First Task
                </button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {recentTasks.map((task) => (
                <Link
                  key={task.id}
                  to={`/tasks/${task.id}/edit`}
                  className="group block"
                >
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900/40 rounded-xl border border-transparent group-hover:border-blue-200 dark:group-hover:border-blue-900 group-hover:bg-white dark:group-hover:bg-gray-700 transition-all">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 dark:text-white truncate">
                        {task.title}
                      </h3>
                      {task.description && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 truncate pr-4">
                          {task.description}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`hidden sm:inline-block px-3 py-1 text-[10px] uppercase font-bold rounded-full ${getPriorityColor(
                          task.priority
                        )}`}
                      >
                        {task.priority}
                      </span>
                      <span
                        className={`px-3 py-1 text-[10px] uppercase font-bold rounded-full ${getStatusColor(
                          task.status
                        )}`}
                      >
                        {task.status.replace("_", " ")}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </Card>
      </div>
    </Layout>
  );
};
