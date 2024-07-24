export default function TableRow({ item, index }) {
  return (
    <tr>
      <th scope="row">{index}</th>
      <td>{item?.UserName}</td>
      <td>{item?.Email}</td>
      <td>{item?.Score}</td>
      <td>{item?.HasAttended.toString()}</td>
    </tr>
  );
}
