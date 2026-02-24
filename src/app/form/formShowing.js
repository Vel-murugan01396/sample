


"use client";
import React, { useEffect, useState } from "react";

export default function FormShowing() {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobilenumber: "",
    gender: "",
  });

  const [errors, setErrors] = useState({}); // ✅ field errors

  useEffect(() => {
    fetchingData();
  }, []);

  const fetchingData = async () => {
    const res = await fetch("/api/form");
    const result = await res.json();
    setData(result);
  };

  // ✅ DELETE
  const handleDelete = async (id) => {
    await fetch("/api/form", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchingData();
  };

  // ✅ OPEN MODAL
  const handleEdit = (item) => {
    setForm(item);
    setErrors({});
    setShowModal(true);
  };

  // ✅ VALIDATION
  const validate = () => {
    let newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.mobilenumber.trim())
      newErrors.mobilenumber = "Mobile number is required";
    if (!form.gender.trim()) newErrors.gender = "Gender is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ UPDATE
  const handleUpdate = async () => {
    if (!validate()) return; // stop if error

    await fetch("/api/form", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setShowModal(false);
    fetchingData();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // remove error when typing
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  return (
    <>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Form Data</h2>

        <table className="border w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">S.no</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Mobile</th>
              <th className="border p-2">Gender</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">{item.name}</td>
                <td className="border p-2">{item.email}</td>
                <td className="border p-2">{item.mobilenumber}</td>
                <td className="border p-2">{item.gender}</td>
                <td className="p-2 flex gap-2 justify-center">
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-400 text-white p-1.5 rounded-sm"
                  >
                    Delete
                  </button>

                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-green-400 text-white p-1.5 rounded-sm"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-4 rounded w-80 space-y-2">
            <h3 className="font-bold">Update User</h3>

            <div>
              <input
                className="border p-1 w-full"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>

            <div>
              <input
                className="border p-1 w-full"
                name="mobilenumber"
                value={form.mobilenumber}
                onChange={handleChange}
                placeholder="Mobile"
              />
              {errors.mobilenumber && (
                <p className="text-red-500 text-sm">
                  {errors.mobilenumber}
                </p>
              )}
            </div>

            <div>
              <input
                className="border p-1 w-full"
                name="gender"
                value={form.gender}
                onChange={handleChange}
                placeholder="Gender"
              />
              {errors.gender && (
                <p className="text-red-500 text-sm">{errors.gender}</p>
              )}
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-400 text-white px-2 py-1 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                className="bg-green-500 text-white px-2 py-1 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}